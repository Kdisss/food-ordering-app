
export default function MenuItem() {
  return (
    <div>
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <img src="/pizza.png" className="max-h-24 max-h-auto block mx-auto" alt=""/>
            <h4 className="font-semibold my-2 text-xl">Pepperoni Pizza</h4>
            <p className=" text-gray-500 text-sm 88">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Mauris semper odio sed sollicitudin
                 eleifend. Nunc facilisis, nulla et congue fringilla.</p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                Add To Cart $12
            </button>
        </div>
    </div>

  )
}
