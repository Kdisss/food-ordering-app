import bcrypt from 'bcrypt';
import mongoose, { Schema, model, models } from "mongoose";


const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (pass) => {
          if (!pass || pass.length < 5) {
            throw new Error("Password must be at least 5 characters long.");
          }
          return true;
        },
        message: "Password validation failed",
      },
    },
  },
  { timestamps: true });

  UserSchema.post('validate', function(user){
    const password = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);
  })

// Use the existing `User` model if it exists; otherwise, create a new one
export const User = models.User || model("User", UserSchema);
