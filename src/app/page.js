import Hero from "../Components/layout/Hero";
import Homemenu from "../Components/layout/Homemenu";
import OwnerCard from "../Components/layout/OwnerCard";
import SectionHeaders from "../Components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <Homemenu />
      <section className="my-16 px-4 md:px-0">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          {/* Left Column - Owner Card */}
          <div className="ml-20">
            <OwnerCard />
          </div>

          {/* Right Column - About Us Content */}
          <div>
            <SectionHeaders subHeader="Our story" mainHeader="About us" />
            <div className="text-gray-500 mt-4 flex flex-col gap-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                semper odio sed sollicitudin eleifend. Nunc facilisis, nulla et
                congue fringilla.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                semper odio sed sollicitudin eleifend. Nunc facilisis, nulla et
                congue fringilla.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel: +(94)71-9361008"
          >
            +(94)71-9361008
          </a>
        </div>
      </section>
    </>
  );
}
