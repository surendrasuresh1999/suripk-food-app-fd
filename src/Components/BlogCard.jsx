import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({person}) => {
  return (
    <li
      key={person.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="p-4">
        <div className="h-56">
          <img
            className="h-full rounded-md object-cover object-center w-full flex-shrink-0 bg-gray-300"
            src={person.imageUrl}
            alt=""
          />
        </div>
        <div className="flex-1 truncate pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-18size font-medium text-gray-900">
              {person.name}
            </h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {4.5}❤️
            </span>
          </div>
          <p className="truncate text-sm text-gray-500">{person.title}</p>
          <Link to={`/blogs/${1}`}
            className="rounded-md inline-block bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-100 border-orange-300 border"
          >
            Read More
          </Link>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
