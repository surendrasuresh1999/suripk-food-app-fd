import React from "react";
import { IndianRupee } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import { CartData } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ foodObj }) => {
  const userInfo = localStorage.getItem("foodieUserDetails");
  const { addToCart } = CartData();
  const navigate = useNavigate();

  const handleAddToCart = async (foodData) => {
    await addToCart(foodData);
  };

  return (
    <li className="food-card relative rounded-lg bg-white">
      <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-t-lg">
        <img
          src={foodObj.imageUrl}
          alt="recipe-img"
          className="h-48 w-full object-cover object-center"
        />
      </div>
      <div className="space-y-1 px-3 py-4">
        <div className="flex items-center justify-between">
          <p className="block truncate text-16size font-bold tracking-wide text-gray-900">
            {foodObj.title}
          </p>
          {foodObj.rating !== 0 && (
            <p className="flex items-center gap-1">
              {foodObj.rating} <StarIcon className="h-4 w-4 text-orange-500" />
            </p>
          )}
        </div>
        <p className="truncate text-10size font-semibold tracking-wider text-gray-500">
          {foodObj.discription}
        </p>
        <p className="flex items-center text-18size font-semibold text-orange-400">
          <IndianRupee size={13} className="mt-1 font-semibold" />
          {foodObj.price}/-
        </p>
        <button
          onClick={() => {
            if (userInfo) {
              handleAddToCart({
                ...foodObj,
                quantity: 1,
              });
            } else {
              navigate("/login");
            }
          }}
          className="flex w-full items-center justify-center rounded-md bg-orange-600 py-2 font-semibold tracking-wide text-white"
        >
          Order now
        </button>
      </div>
    </li>
  );
};

export default RestaurantCard;
