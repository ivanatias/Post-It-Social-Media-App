import React from "react";
import ConfirmModal from "../ConfirmModal";
import Dropdown from "./Dropdown";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import { useToggle } from "../../hooks/useToggle";
import { useSession } from "next-auth/react";
import { deletePost } from "../../services/post/deletePost";
import { saveOrUnsavePost } from "../../services/post/saveOrUnsavePost";
import { toast } from "react-toastify";

const Post = ({ post, refresh }) => {
  const { data: session } = useSession();
  const { value: dropdownOpen, toggleValue: toggleDropdownOpen } = useToggle();
  const { value: saving, toggleValue: toggleSaving } = useToggle();
  const { value: unsaving, toggleValue: toggleUnsaving } = useToggle();
  const { value: openModal, toggleValue: toggleModal } = useToggle();

  const alreadySaved = post.saved.some(
    (item) => item.postedBy._id === session?.user?.uid
  );

  const handleDeletePost = async (postId) => {
    if (!postId) return;
    try {
      await deletePost(postId);
      toast.success("Post deleted!");
      refresh();
    } catch (err) {
      toast.error(`Couldn't delete the post due to an error: ${err.message}`);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      toggleSaving();
      await saveOrUnsavePost({
        postId,
        userId: session?.user?.uid,
        action: "save",
      });
      refresh();
      toast.success("Post saved!");
    } catch (err) {
      toast.error(
        `There was an error saving this post: ${err.message}... Try again.`
      );
    } finally {
      toggleSaving();
      toggleDropdownOpen();
    }
  };

  const handleUnsavePost = async (postId) => {
    try {
      toggleUnsaving();
      await saveOrUnsavePost({
        postId,
        userId: session?.user?.uid,
        action: "unsave",
      });
      refresh();
      toast.success("Post Unsaved!");
    } catch (err) {
      toast.error(
        `There was an error unsaving this post: ${err.message}... Try again.`
      );
    } finally {
      toggleUnsaving();
      toggleDropdownOpen();
    }
  };

  return (
    <>
      <article className="relative p-3 transition duration-300 ease-in-out hover:shadow-md hover:shadow-gray-600">
        <PostHeader
          avatarUrl={post.postedBy.image}
          userTag={post.postedBy.userTag}
          userId={post.postedBy._id}
          toggleDropdownOpen={toggleDropdownOpen}
          dropdownOpen={dropdownOpen}
        />
        {dropdownOpen && (
          <Dropdown
            toggleDropdownOpen={toggleDropdownOpen}
            toggleModal={toggleModal}
            postedBy={post.postedBy}
            postImage={post.image}
            postId={post._id}
            saving={saving}
            unsaving={unsaving}
            handleSavePost={handleSavePost}
            handleUnsavePost={handleUnsavePost}
            alreadySaved={alreadySaved}
          />
        )}
        <PostBody postImageUrl={post.image.asset.url} postTitle={post.title} />
      </article>
      {openModal && (
        <ConfirmModal
          toggleModal={toggleModal}
          deletePost={handleDeletePost}
          postId={post?._id}
        />
      )}
    </>
  );
};

export default Post;
