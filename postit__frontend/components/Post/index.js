import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import ConfirmModal from "./ConfirmModal";
import Dropdown from "./Dropdown";
import axios from "axios";

import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ post: { title, image, postedBy, _id, save } }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  const router = useRouter();

  const deletePost = async (postId) => {
    if (!postId) return;
    await axios
      .post("/api/posts/deletePost", {
        postId: postId,
      })
      .then(() => {
        toast.success("Post deleted!");
        setPostDeleted(true);
      })
      .catch((error) => {
        toast.error(`Couldn't delete the post due to an error: ${error}`);
      });
  };

  //Create save post functionality...

  return (
    <>
      {postDeleted ? (
        <div className="grid w-full text-sm font-bold text-white 2xl:text-base h-1/3 place-content-center">
          Post deleted
        </div>
      ) : (
        <div className="relative p-3 transition duration-300 ease-in-out hover:shadow-md hover:shadow-gray-600">
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
              <div className="text-sm font-bold text-white 2xl:text-base">
                {postedBy?.userTag}
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
            <Dropdown
              setDropdownOpen={setDropdownOpen}
              setOpenModal={setOpenModal}
              postedBy={postedBy}
              postImage={image}
              postId={_id}
            />
          )}
          <div className="relative post__image-container">
            <Image
              src={image?.asset?.url}
              placeholder="blur"
              blurDataURL={image?.asset?.url}
              layout="fill"
              className="rounded-lg post__image"
              alt="post"
            />
          </div>
          <p className="mt-3 text-sm text-white 2xl:text-base">{title}</p>
        </div>
      )}
      {openModal && (
        <ConfirmModal
          setOpenModal={setOpenModal}
          deletePost={deletePost}
          postId={_id}
        />
      )}
    </>
  );
};

export default Post;
