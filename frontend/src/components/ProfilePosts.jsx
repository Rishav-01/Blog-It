import React from "react";
import { IMAGE_FOLDER } from "../url";
import { Link } from "react-router-dom";

const ProfilePosts = ({ post }) => {
  return (
    <Link to={`/posts/post/${post._id}`}>
      <div className="w-full flex mt-8 space-x-4">
        {/* left */}
        <div className="w-[35%] h-[200px] flex justify-center items-center">
          <img
            src={
              post.photo && post.photo[0] === "h"
                ? post.photo
                : IMAGE_FOLDER + post.photo
            }
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        {/* right */}
        <div className="flex flex-col w-[65%]">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            {post.title}
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>{post.username}</p>
            <div className="flex space-x-2">
              <p>
                {new Date(post.updatedAt).toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
          <p className="text-sm md:text-lg">
            {post.desc.slice(0, 200)}{" "}
            {post.desc.length < 200 ? "" : "...Read more"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProfilePosts;
