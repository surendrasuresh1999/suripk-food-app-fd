import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { category } from "../StaticData";
import RestaurantCard from "../Components/RestaurantCard";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { Navigate } from "react-router-dom";
import bannerImg from "../../src/assets/banner.png";

const FoodPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: false,
  });

  const jwtToken = Cookies.get("jwtToken");
  const getFoodItems = async () => {
    return await fetch(`${Baseurl.baseurl}/api/food`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["foodData"],
    queryFn: getFoodItems,
  });
  return (
    <div className="space-y-8">
      <div className="realtive banner-img min-h-56 lg:min-h-96">
        <div className="flex flex-col justify-center min-h-56 lg:min-h-96 p-8 max-w-4xl">
          <h1 className="text-xl lg:text-6xl font-bold text-white ">
            Order your <br />
            favourite food here
          </h1>
          <p className="text-white text-14size mt-10 lg:text-18size text-justify font-medium max-w-2xl">
            Choose from a diverse featuring a delectable array of dishes crafted
            with the finest ingredients and culinary expertise. Our mission is
            to satisy your cravings and elevate your dining experience, one
            delicious meal at a time.
          </p>
        </div>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {category.map((category, index) => (
            <div
              className="embla__slide group/slide flex items-center justify-center gap-3 rounded-md border bg-white py-4 text-center shadow-sm hover:border-slate-200"
              key={index}
            >
              <img
                src={category.imgUrl}
                alt="blog-slider"
                className="h-8 w-8 sm:h-12 sm:w-12"
              />
              <span className="font-700 truncate text-14size tracking-wide text-gray-900 group-hover/slide:scale-100 group-hover/slide:text-slate-900 sm:text-22size">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-20size font-bold tracking-wide text-gray-800 sm:text-28size">
          Top dishes for you
        </h1>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : data && data.status === 401 ? (
          <Navigate to={"/login"} state={{ from: location }} replace />
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {data.foodItems.map((food, index) => (
              <RestaurantCard foodObj={food} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
