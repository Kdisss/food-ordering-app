"use client"; // Required in Next.js App Router for fetching inside components
import { useEffect, useState } from "react";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function Homemenu() {
  const [foods, setFoods] = useState([]);

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
      }
    }
    fetchFoods();
  }, []);

  return (
    <section>
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
        {foods.length > 0 ? (
          foods.map((food) => <MenuItem key={food._id} food={food} />)
        ) : (
          <p className="text-center col-span-3">Loading menu items...</p>
        )}
      </div>
    </section>
  );
}
