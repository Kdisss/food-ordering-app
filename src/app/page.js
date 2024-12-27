import Header from "@/Components/layout/Header";
import Hero from "@/Components/layout/Hero";
import Homemenu from "@/Components/layout/Homemenu";
import SectionHeaders from "@/Components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      
      <Hero/>
      <Homemenu/>
      <section className="text-center my-16">
        <SectionHeaders
        subHeader={'Our story'}
        mainHeader={'About us'}/>
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Mauris semper odio sed sollicitudin
                 eleifend. Nunc facilisis, nulla et congue fringilla.
        </p>
        <p >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Mauris semper odio sed sollicitudin
                 eleifend. Nunc facilisis, nulla et congue fringilla.
        </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
        subHeader={'Don\'t hesitate'}
        mainHeader={'Contact us'}/>
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel: +(94)71-9361008">
            +(94)71-9361008</a>
        </div>
      </section>
      
    </>
  );
}
