import React from "react";

const ServiceCard = ({ person }) => {
  return (
    <li
      key={person.email}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex flex-1 flex-col p-3">
        <img
          className="mx-auto h-22 w-28 flex-shrink-0"
          src={person.imgUrl}
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900 leading-4">
          {person.name}
        </h3>
        <dl className="flex flex-grow flex-col justify-between space-y-3">
          <dd className="text-sm text-gray-900 text-22size font-semibold tracking-wide">
            {person.title}
          </dd>
          <span className="text-sm text-gray-500 text-justify font-medium ">
            {person.discription}
          </span>
        </dl>
      </div>
    </li>
  );
};

export default ServiceCard;
