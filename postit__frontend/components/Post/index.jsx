import React from "react";
import ConfirmModal from "../ConfirmModal";
import Dropdown from "./Dropdown";
import UserHeader from "../UserHeader";
import Image from "next/image";
import { useToggle } from "../../hooks/useToggle";
import { useSession } from "next-auth/react";

import axios from "axios";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { toast } from "react-toastify";

const Post = ({ post, refresh }) => {
  const { data: session } = useSession();
  const { value: dropdownOpen, toggleValue: toggleDropdownOpen } = useToggle();
  const { value: saving, toggleValue: toggleSaving } = useToggle();
  const { value: unsaving, toggleValue: toggleUnsaving } = useToggle();
  const { value: openModal, toggleValue: toggleModal } = useToggle();

  const alreadySaved = post?.saved?.filter(
    (item) => item.postedBy._id === session?.user?.uid
  );

  const deletePost = (postId) => {
    if (!postId) return;
    axios
      .post("/api/posts/deletePost", {
        postId: postId,
      })
      .then(() => {
        toast.success("Post deleted!");
        refresh();
      })
      .catch((err) => {
        toast.error(`Couldn't delete the post due to an error: ${err.message}`);
      });
  };

  const saveOrUnsavePost = (postId) => {
    if (alreadySaved?.length === 0) {
      toggleSaving();
      axios
        .post(
          `/api/posts/saveOrUnsavePost?postId=${postId}&userId=${session?.user?.uid}&action=save`
        )
        .then(() => {
          toggleSaving();
          toggleDropdownOpen();
          refresh();
          toast.success("Post saved!");
        })
        .catch((error) => {
          toggleSaving();
          toast.error(
            `There was an error saving this post: ${error.message}... Try again.`
          );
        });
    }
    if (alreadySaved?.length > 0) {
      toggleUnsaving();
      axios
        .post(
          `/api/posts/saveOrUnsavePost?postId=${postId}&userId=${session?.user?.uid}&action=unsave`
        )
        .then(() => {
          toggleUnsaving();
          toggleDropdownOpen();
          refresh();
          toast.success("Post Unsaved!");
        })
        .catch((error) => {
          toggleUnsaving();
          toast.error(
            `There was an error unsaving this post: ${error.message}... Try again.`
          );
        });
    }
  };

  return (
    <>
      <article className="relative p-3 transition duration-300 ease-in-out hover:shadow-md hover:shadow-gray-600">
        <div className="flex items-center justify-between w-full mb-3">
          <UserHeader
            avatarUrl={post.postedBy.image}
            userTag={post.postedBy.userTag}
            userId={post.postedBy._id}
          />
          <div
            className="flex items-center justify-center w-5 h-5 transition duration-150 ease-in-out bg-white rounded-sm cursor-pointer hover:bg-gray-200"
            onClick={() => toggleDropdownOpen()}
            aria-label="Toggle Dropdown"
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
            toggleModal={toggleModal}
            postedBy={post?.postedBy}
            postImage={post?.image}
            postId={post?._id}
            saving={saving}
            unsaving={unsaving}
            saveOrUnsavePost={saveOrUnsavePost}
            alreadySaved={alreadySaved}
          />
        )}
        <div className="relative post__image-container">
          {post?.image && (
            <Image
              src={post?.image?.asset?.url}
              placeholder="blur"
              blurDataURL={post?.image?.asset?.url}
              layout="fill"
              className="rounded-lg post__image"
              alt="post"
            />
          )}
        </div>
        <p className="mt-3 text-sm text-white 2xl:text-base">{post?.title}</p>
      </article>
      {openModal && (
        <ConfirmModal
          toggleModal={toggleModal}
          deletePost={deletePost}
          postId={post?._id}
        />
      )}
    </>
  );
};

export default Post;
