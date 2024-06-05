import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import React from "react";

const BlogDetails = () => {
  return (
    <div className="max-w-5xl m-auto">
      <div className="space-y-4">
        <h1 className="text-black text-18size sm:text-36size font-bold tracking-wide">
        Culinary Chronicles: A Feast for the Senses
        </h1>
        <img
          src={
            "https://marketplace.canva.com/EAFloAOrGBY/1/0/1600w/canva-orange-and-black-minimalist-food-banner-landscape-hvZzaUttSLk.jpg"
          }
          alt="banner-img"
          className="max-h-96 w-full object-cover object-center rounded-md"
        />
        <>
          {/* <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                  {data?.posts.user?.slice(0, 1).toUpperCase()}
                </Avatar>
                <div>
                  <p className="font-medium text-18size text-black dark:text-white">
                    {data?.posts.user?.charAt(0).toUpperCase() +
                      data?.posts.user?.slice(1)}
                  </p>
                  <span className="font-normal text-14size text-gray-700 dark:text-indigo-600">
                    <ReactTimeAgo
                      date={Date.parse(data?.posts.createdAt)}
                      locale="en-US"
                    />
                  </span>
                </div>
              </div>
            <div className="flex gap-2 flex-row-reverse">
                <button
                  onClick={() => handleDropLike(data.posts._id)}
                  className="flex items-center gap-1 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-indigo-600 "
                >
                  {data?.posts.likedUsers?.includes(userDetails._id) ? (
                    <Filled className="text-orange-500 h-6 w-6" />
                  ) : (
                    <HeartIcon className="text-orange-500 h-6 w-6" />
                  )}
                  {data?.posts.likedUsers?.length > 0 &&
                    numeral(data?.posts.likedUsers?.length).format("0,a")}
                </button>
              </div>
          </div> */}
          <div className="text-justify text-gray-600 dark:text-white">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </>
        <button
          // onClick={() => navigate(-1)}
          className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-2 max-w-max"
        >
          <ArrowLeftIcon className="h-4 w-4 text-indigo-700" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
