import mongoose, { Schema, model, models } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Store image URL or filename
  },
  { timestamps: true }
);

const Food = models.Food || model("Food", foodSchema);
export default Food;
