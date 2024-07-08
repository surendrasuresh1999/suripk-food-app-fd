import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../BaseUrl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { HeartIcon, HeartIcon as Filled } from "@heroicons/react/24/outline";
import numeral from "numeral";
import axios from "axios";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem("foodieUserDetails"));
  const jwtToken = Cookies.get("jwtToken");
  const params = useParams();
  const queryClient = useQueryClient();

  const fetchBlogDetails = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog/${params.id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: fetchBlogDetails,
  });

  const handleDropLike = (blogId) => {
    axios
      .put(`${Baseurl.baseurl}/api/blog/${blogId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("blogData");
        } else {
          toast.error(res.data.message);
          console.log("res", res);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="m-auto max-w-5xl">
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : (
        <div className="space-y-4">
          <h1 className="text-18size font-bold tracking-wide text-black sm:text-36size">
            {data.blogPost.title}
          </h1>
          <img
            src={data.blogPost.imageUrl}
            alt="banner-img"
            className="max-h-96 w-full rounded-md object-cover object-center"
          />
          <p className="text-justify text-gray-600">
            {data.blogPost.discription}
          </p>
          <div className="flex items-center justify-between">
            <Link
              to={"/blogs"}
              className="flex max-w-max items-center gap-2 rounded-md border border-orange-400 bg-orange-50 p-3 text-sm font-semibold text-orange-600 hover:bg-orange-100"
            >
              <ArrowLeftIcon className="h-4 w-4 text-orange-600" />
              Go Back
            </Link>
            <div className="flex flex-row-reverse gap-2">
              <button
                onClick={() => handleDropLike(data.blogPost._id)}
                className="flex items-center gap-1 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-indigo-600"
              >
                <span className="text-20size font-semibold text-orange-500">
                  {data.blogPost.likedUsers?.length > 0 &&
                    numeral(data.blogPost.likedUsers?.length).format("0,a")}
                </span>
                {data.blogPost?.likedUsers?.includes(userDetails._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-orange-500"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <HeartIcon className="h-6 w-6 text-orange-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
