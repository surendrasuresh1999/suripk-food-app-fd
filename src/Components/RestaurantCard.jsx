import React from "react";
const RestaurantCard = ({ person }) => {
  return (
    <li className="relative bg-white">
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 ">
        <img
          src={person.imageUrl}
          alt=""
          className="pointer-events-none w-full object-cover"
        /> 
      </div>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {person.title}
      </p>
    </li>
  );
};

export default RestaurantCard;
