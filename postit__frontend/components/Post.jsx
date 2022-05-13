import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import {
  AiOutlineDownload,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineSave,
} from "react-icons/ai";

const Post = ({ post: { title, image, postedBy, _id } }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative m-3 ">
      <div className="flex items-center justify-between w-full mb-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push(`/user-profile/${postedBy._id}`)}
        >
          <img
            src={postedBy?.image}
            alt="User avatar"
            className="object-cover w-8 h-8 rounded-full"
          />
          <div className="text-sm font-bold text-white xl:text-base">
            {postedBy?.userName}
          </div>
        </div>
        <div
          className="flex items-center justify-center w-5 h-5 transition duration-150 ease-in-out bg-white rounded-sm cursor-pointer hover:bg-gray-200"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {dropdownOpen ? (
            <HiOutlineChevronUp fontSize={16} />
          ) : (
            <HiOutlineChevronDown fontSize={16} />
          )}
        </div>
      </div>
      {dropdownOpen && (
        <div className="absolute z-10 flex flex-col gap-2 p-3 bg-white rounded-md right-2 top-14">
          <a
            className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100"
            href={`${image?.asset?.url}?dl=`}
            download
            onClick={() => setDropdownOpen(false)}
          >
            <AiOutlineDownload fontSize={16} />
            <p>Download</p>
          </a>
          <div className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100">
            <AiOutlineSave fontSize={16} />
            <p>Save</p>
          </div>
          <div
            className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100"
            onClick={() => {
              setDropdownOpen(false);
              router.push(`/post/${_id}`);
            }}
          >
            <AiOutlineEye fontSize={16} />
            <p>Post Details</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100">
            <AiOutlineDelete fontSize={16} />
            <p>Delete</p>
          </div>
        </div>
      )}
      <div className="relative post__image-container">
        <Image
          src={image?.asset?.url}
          layout="fill"
          className="rounded-lg post__image"
          alt="post"
        />
      </div>
      <p className="my-3 text-sm font-semibold text-white xl:text-base">
        {title}
      </p>
    </div>
  );
};

export default Post;
