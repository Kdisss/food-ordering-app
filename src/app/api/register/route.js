import mongoose from "mongoose";
import { User } from "../../../app/models/User";

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a new user in the database
    const createdUser = await User.create(body);

    // Return the created user as a JSON response
    return new Response(JSON.stringify(createdUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle errors and return a 500 response
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}
