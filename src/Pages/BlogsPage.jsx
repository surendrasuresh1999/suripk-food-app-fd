import React from "react";
import BlogCard from "../Components/BlogCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Baseurl } from "../BaseUrl";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import Cookies from "js-cookie";
import bannerImg from "../../src/assets/foo-blog-banner.jpg";

const BlogsPage = () => {
  const jwtToken = Cookies.get("jwtToken");

  const fetchBlogs = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogsData"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="space-y-12">
      <div className="relative">
        <img
          src={bannerImg}
          alt="banner"
          className="w-full rounded-md object-cover sm:h-96"
        />
        <h1 className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-4xl font-bold tracking-wide text-white sm:text-7xl">
          Blogs
        </h1>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="mt-1 w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-gray-50 px-3 text-20size font-bold tracking-wide text-gray-800 sm:text-32size">
              Our Blogs
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-justify text-18size font-medium text-gray-700 sm:text-center">
            Welcome to our culinary haven, where every recipe tells a story and
            every dish is a work of art. Dive into our treasure trove of food
            adventures, where we explore the rich tapestry of flavors, textures,
            and cultures that make up the world of gastronomy.
          </p>
        </div>
      </div>
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.blogs?.map((person, index) => (
            <BlogCard person={person} key={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogsPage;
