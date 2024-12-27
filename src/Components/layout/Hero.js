import Image from "next/image";
import Right from "../Icons/Right";

export default function Hero(){
    return(
        <section className="hero mt-4">
            <div className="py-12">
            <h1 className="text-4xl font-semibold">
                Everything is better with a&nbsp; 
                <span className="text-primary">
                    Pizza
                </span>
            </h1>
            <p className="text-sm my-6 text-gray-500">
               Pizza is the missing piece that makes every day
               complete, A simple yet delicious joy in life. 
            </p>

            <div className="flex gap-4 text-sm items-center">
                <button className="bg-primary uppercase flex gap-2 text-white px-4 py-2 rounded-full">
                    Order Now
                    <Right/>
                </button>
                <button className="flex gap-2 py-2 text-gray-500 font-semibold">
                    Learn More
                    <Right/>
                    </button>
            </div>

            </div>

            

            <div className="w-full relative">
            <Image 
             src={'/pizza.png'} 
             layout={'fill'}
             objectFit={'contain'}
             alt={'pizza'}></Image>
             </div>
        </section>
    );
}