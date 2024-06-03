import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { category, restuarents } from "../StaticData";
import RestaurantCard from "../Components/RestaurantCard";

const Homepage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: false,
  });

  return (
    <div className="space-y-8">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {category.map((category, index) => (
            <div
              className="embla__slide border rounded-md shadow-sm text-center py-4 group/slide hover:border-slate-200 bg-white flex items-center gap-3 justify-center"
              key={index}
            >
              <img
                src={category.imgUrl}
                alt="blog-slider"
                className="h-8 w-8 sm:h-12 sm:w-12"
              />
              <span className="text-gray-900 group-hover/slide:text-slate-900 group-hover/slide:scale-100 font-700 tracking-wide text-14size sm:text-22size truncate">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-gray-800 font-bold tracking-wide text-20size sm:text-28size">
          Top dishes for you
        </h1>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {restuarents.map((person, index) => (
            <RestaurantCard person={person} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
