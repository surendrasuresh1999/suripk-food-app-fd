import React from "react";
import ServiceCard from "../Components/ServiceCard";
import { servicesData, brandsData } from "../StaticData";

const Services = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-center flex-col justify-center service-banner">
        <h1 className="text-white font-bold text-7xl tracking-wide">Services</h1>
      </div>
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t mt-1 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="text-gray-800 bg-gray-50 px-3 font-bold tracking-wide text-20size sm:text-32size">
                Our Services
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-18size max-w-4xl mx-auto text-justify sm:text-center">
            inappropriate behavior is often laughed off as “boys will be boys,”
            women face higher conduct standards especially in the workplace.
            That’s why it’s crucial that, as women.
          </p>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((person, index) => (
            <ServiceCard person={person} key={index} />
          ))}
        </ul>
      </div>
      <div className="space-y-10 py-10">
        <div className="space-y-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t mt-1 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="text-gray-800 bg-gray-50 px-3 font-bold tracking-wide text-20size sm:text-32size">
                Brands love to take Our Services
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-18size max-w-4xl mx-auto text-justify sm:text-center">
            inappropriate behavior is often laughed off as “boys will be boys,”
            women face higher conduct standards especially in the workplace.
            That’s why it’s crucial that, as women.
          </p>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {brandsData.map((person, index) => (
            <li
              key={index}
              className="flex items-center justify-center bg-white px-3 py-4 rounded-md border"
            >
              <img src={person.imgUrl} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Services;