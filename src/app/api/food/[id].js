import dbConnect from "../../../utils/dbConnect";
import Food from "../../../app/models/food"; // FIX: Correct import

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection
  const { id } = req.query; // Ensure correct ID retrieval

  if (req.method === "GET") {
    try {
      const foodItem = await Food.findById(id); // FIX: Use correct model name
      if (!foodItem)
        return res.status(404).json({ success: false, message: "Food not found" });

      return res.status(200).json({ success: true, data: foodItem });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, description, price } = req.body;
      const updatedFood = await Food.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true }
      );

      if (!updatedFood)
        return res.status(404).json({ success: false, message: "Food not found" });

      return res.status(200).json({ success: true, data: updatedFood });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedFood = await Food.findByIdAndDelete(id);
      if (!deletedFood)
        return res.status(404).json({ success: false, message: "Food not found" });

      return res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
