export default function MenuItem({ food }) {
  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <img src="/pizza.png" className="max-h-24 max-h-auto block mx-auto" alt="" />
        <h4 className="font-semibold my-2 text-xl">{food.name}</h4>
        <p className="text-gray-500 text-sm">{food.description}</p>
        <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
          Add To Cart ${food.price}
        </button>
      </div>
    </div>
  );
}
