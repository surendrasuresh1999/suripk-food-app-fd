import React from "react";

const ServiceCard = ({ person }) => {
  return (
    <li
      key={person.email}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex flex-1 flex-col gap-3 p-3">
        <img
          className="mx-auto h-22 w-28 flex-shrink-0"
          src={person.imgUrl}
          alt=""
        />
        <h3 className="mt-6 text-22size sm:text-24size font-medium text-gray-900 leading-4">
        {person.title}
        </h3>
        <dl className="flex flex-grow flex-col justify-between space-y-3">
          <span className="text-sm text-gray-500 text-justify font-medium ">
            {person.discription}
          </span>
        </dl>
        <button className="w-full bg-orange-500 text-14size font-semibold tracking-wide py-2 rounded-md text-white">Book now</button>
      </div>
    </li>
  );
};

export default ServiceCard;
