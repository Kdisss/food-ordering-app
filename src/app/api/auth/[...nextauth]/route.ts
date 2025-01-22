import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect";
import { User } from "../../../../app/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "name", placeholder: "username" },
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB if not already connected
        if (!mongoose.connection.readyState) {
          await mongoose.connect(process.env.MONGODB_URL);
        }

        // Find the user by email
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        // Verify password
        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        // Return the necessary user details for the session
        return { name: user.name, id: user._id.toString(), email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If the user exists, add its data to the token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt", // Using JWT for session handling
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
});

export { handler as GET, handler as POST };
