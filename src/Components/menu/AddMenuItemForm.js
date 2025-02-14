"use client";
import { useState } from "react";

export default function AddMenuItemForm({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Menu item added successfully!");
        setFormData({ name: "", description: "", price: "", image: "" }); // Reset form
        onAdd(data.data); // Notify parent component about the new food item
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error adding item.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      {message && <p className="text-red-500">{message}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Menu Item"}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="w-full bg-gray-500 text-white p-2 rounded mt-2"
      >
        Cancel
      </button>
    </form>
  );
}
