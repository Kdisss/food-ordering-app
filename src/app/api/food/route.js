
import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Food from "../../../app/models/food";

// GET - Fetch all food items
export async function GET() {
  await dbConnect();
  try {
    console.log("✅ GET /api/food route hit");

    const foods = await Food.find({});
    return NextResponse.json({ success: true, data: foods }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in GET /api/food:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST - Create a new food item
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { name, description, price } = body;

    if (!name || !description || !price) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const newFood = await Food.create({ name, description, price });
    return NextResponse.json({ success: true, data: newFood }, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST /api/food:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

