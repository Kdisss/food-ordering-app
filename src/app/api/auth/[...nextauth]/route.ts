import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../../app/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);

        // Find the user by email
        const user = await User.findOne({ email: credentials.email});

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }


        // Return the user object
        return {
          id: user._id,
          email: user.email,
          password: user.password,
        };
      
          },
        }),
      ],
      pages: {
        signIn: "/login", // Redirect to your login page if login fails
      },
}); 

export {handler as GET, handler as POST}