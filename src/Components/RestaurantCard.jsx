import React from "react";
import rating from "../assets/foodCategoys/food_26.png";
import stars from "../assets/foodCategoys/rating_starts.png";
import { IndianRupee } from "lucide-react";
const RestaurantCard = ({ person }) => {
  return (
    <li className="relative bg-white food-card rounded-lg">
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-t-lg bg-gray-100 ">
        <img src={rating} alt="" />
      </div>
      <div className="py-4 px-3 space-y-1">
        <div className="flex items-center justify-between">
          <p className="block truncate text-16size tracking-wide font-medium text-gray-900">
            {person.title}
          </p>
          <img src={stars} alt="" />
        </div>
        <p className="text-10size text-gray-500 font-medium tracking-wide">
          Food provides essential nutriontions to our body so take proper
          nutritonal food.
        </p>
        <p className="text-orange-400 font-semibold flex items-center text-18size">
          <IndianRupee size={13} className="mt-1 font-semibold" />
          24/-
        </p>
        <button className="w-full bg-orange-600 text-white font-semibold tracking-wide py-1 rounded-md flex items-center justify-center">
          Add to cart
        </button>
      </div>
    </li>
  );
};

export default RestaurantCard;
