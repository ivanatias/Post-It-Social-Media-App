import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ConfirmModal from "./ConfirmModal";
import Dropdown from "./Dropdown";
import axios from "axios";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ post, refreshData }) => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [unsaving, setUnsaving] = useState(false);
  const router = useRouter();

  let alreadySaved = post?.saved?.filter(
    (item) => item.postedBy?._id === session?.user?.uid
  );
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const deletePost = (postId) => {
    if (!postId) return;
    axios
      .post("/api/posts/deletePost", {
        postId: postId,
      })
      .then(() => {
        toast.success("Post deleted!");
      })
      .catch((error) => {
        toast.error(`Couldn't delete the post due to an error: ${error}`);
      });
  };

  const saveOrUnsavePost = (postId) => {
    if (alreadySaved?.length === 0) {
      setSaving(true);
      axios
        .post(
          `/api/posts/saveOrUnsavePost?postId=${postId}&userId=${session.user.uid}&action=save`
        )
        .then(() => {
          setSaving(false);
          setDropdownOpen(false);
          toast.success("Post saved!");
        })
        .catch((error) => {
          setSaving(false);
          toast.error(
            `There was an error saving this post: ${error.message}... Try again.`
          );
        });
    }
    if (alreadySaved?.length > 0) {
      setUnsaving(true);
      axios
        .post(
          `/api/posts/saveOrUnsavePost?postId=${postId}&userId=${session.user.uid}&action=unsave`
        )
        .then(() => {
          setUnsaving(false);
          setDropdownOpen(false);
          toast.success("Post Unsaved!");
        })
        .catch((error) => {
          setUnsaving(false);
          toast.error(
            `There was an error unsaving this post: ${error.message}... Try again.`
          );
        });
    }
  };

  return (
    <>
      <div className="relative p-3 transition duration-300 ease-in-out hover:shadow-md hover:shadow-gray-600">
        <div className="flex items-center justify-between w-full mb-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push(`/user-profile/${post.postedBy._id}`)}
          >
            <img
              src={post?.postedBy?.image}
              alt="User avatar"
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="text-sm font-bold text-white 2xl:text-base">
              {post?.postedBy?.userTag}
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
            postedBy={post?.postedBy}
            postImage={post?.image}
            postId={post?._id}
            saving={saving}
            unsaving={unsaving}
            saveOrUnsavePost={saveOrUnsavePost}
            alreadySaved={alreadySaved}
            refreshData={refreshData}
          />
        )}
        <div className="relative post__image-container">
          <Image
            src={post?.image?.asset?.url}
            placeholder="blur"
            blurDataURL={post.image?.asset?.url}
            layout="fill"
            className="rounded-lg post__image"
            alt="post"
          />
        </div>
        <p className="mt-3 text-sm text-white 2xl:text-base">{post.title}</p>
      </div>
      {openModal && (
        <ConfirmModal
          setOpenModal={setOpenModal}
          deletePost={deletePost}
          postId={post?._id}
          refreshData={refreshData}
        />
      )}
    </>
  );
};

export default Post;
