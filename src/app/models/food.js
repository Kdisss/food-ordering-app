import mongoose, { Schema, model, models } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Use the existing `food` model if it exists; otherwise, create a new one
const Food = models.Food || model("Food", foodSchema);

export default Food;
