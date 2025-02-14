"use client"; // Required in Next.js App Router for fetching inside components
import { useEffect, useState } from "react";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import AddMenuItemForm from "../menu/AddMenuItemForm";
import Loader from "../Icons/Loader";
import SectionHeaders from "./SectionHeaders";

export default function Homemenu() {
  const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch food items on component mount
  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch("/api/food"); // Fetch from API
        const data = await res.json();
        if (data.success) {
          setFoods(data.data); // Store the fetched food items
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
    fetchFoods();
  }, []);

  // Function to add a new food item to the state
  const handleAddFoodItem = (newFood) => {
    setFoods((prevFoods) => [...prevFoods, newFood]); // Update state with the new food item
  };

  return (
    <section>
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Food
        </button>

        {showForm && (
          <AddMenuItemForm
            onClose={() => setShowForm(false)}
            onAdd={handleAddFoodItem} // Pass the function to handle adding new food
          />
        )}
      </div>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[100px] -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt="salad" />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt="salad" />
        </div>
      </div>

      <div className="text-center font-semibold uppercase text-gray-600 mb-4">
        <SectionHeaders subHeader={"Check out"} mainHeader={"Menu"} />
      </div>

      {/* Display Menu Items */}
      <div className="grid grid-cols-3 gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center col-span-3">
            <Loader />
          </div>
        ) : foods.length > 0 ? (
          foods.map((food) => <MenuItem key={food._id} food={food} />)
        ) : (
          <p className="col-span-3 text-center">No food items available.</p>
        )}
      </div>
    </section>
  );
}