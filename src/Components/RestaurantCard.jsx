import React from "react";
import { IndianRupee } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const RestaurantCard = ({ person }) => {
  const jwtToken = Cookies.get("jwtToken");
  const userDetails = JSON.parse(localStorage.getItem("foodieUserDetails"));

  const addToCart = (foodData) => {
    axios
      .put(`${Baseurl.baseurl}/api/cart`, foodData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.status) {
          toast.success(response.data.message);
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <li className="food-card relative rounded-lg bg-white">
      <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-t-lg">
        <img
          src={person.imageUrl}
          alt="recipe-img"
          className="h-48 w-full object-cover object-center"
        />
      </div>
      <div className="space-y-1 px-3 py-4">
        <div className="flex items-center justify-between">
          <p className="block truncate text-16size font-medium tracking-wide text-gray-900">
            {person.title}
          </p>
          <p className="flex items-center gap-1">
            4.5 <StarIcon className="h-4 w-4 text-orange-500" />
          </p>
        </div>
        <p className="truncate text-10size font-medium tracking-wide text-gray-500">
          {person.discription}
        </p>
        <p className="flex items-center text-18size font-semibold text-orange-400">
          <IndianRupee size={13} className="mt-1 font-semibold" />
          {person.price}/-
        </p>
        <button
          onClick={() =>
            addToCart({
              ...person,
              quantity: 1,
            })
          }
          className="flex w-full items-center justify-center rounded-md bg-orange-600 py-2 font-semibold tracking-wide text-white"
        >
          Order now
        </button>
      </div>
    </li>
  );
};

export default RestaurantCard;
