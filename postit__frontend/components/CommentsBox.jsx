import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loading } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const CommentsBox = ({ comments, refresh, isFetching }) => {
  const [commentInput, setCommentInput] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const addComment = (e) => {
    e.preventDefault();

    if (commentInput) {
      setAddingComment(true);
      axios
        .post("/api/comments/addComment", {
          postId: id,
          userId: session?.user?.uid,
          comment: commentInput,
        })
        .then(() => {
          setAddingComment(false);
          setCommentInput("");
          refresh();
          toast.success("You added a comment!");
        })
        .catch((error) => {
          setAddingComment(false);
          toast.error(`Couldn't add comment due to an error: ${error.message}`);
        });
    }
  };

  const removeComment = (e, comment) => {
    e.stopPropagation();
    if (!comment) return;

    axios
      .post("/api/comments/removeComment", {
        postId: id,
        userId: session?.user?.uid,
        commentKey: comment._key,
      })
      .then(() => {
        refresh();
        toast.success("Comment removed");
      })
      .catch((error) => {
        toast.error(
          `Couldn't remove the comment due to an error: ${error.message}`
        );
      });
  };

  return (
    <>
      <div
        className={`flex flex-col gap-6  max-h-[500px] overflow-y-auto ${
          comments?.length > 0
            ? "bg-gray-800 shadow-md shadow-gray-600 px-4 py-8 rounded-xl"
            : "bg-transparent"
        }`}
      >
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._key} className="flex flex-col gap-3 w-fit">
              <div
                className="flex items-center gap-2 cursor-pointer w-fit"
                onClick={() => router.push(`/user/${comment.postedBy._id}`)}
              >
                <img
                  src={comment.postedBy.image}
                  alt="User avatar"
                  className="object-cover w-8 h-8 rounded-full"
                />
                <div className="text-sm font-bold text-white 2xl:text-base">
                  {comment.postedBy.userTag}
                </div>
                {session?.user?.uid === comment.postedBy._id && (
                  <button
                    type="button"
                    className="rounded-xl flex items-center justify-center px-2 py-1 ml-2 text-sm text-gray-300 transition duration-150 ease-in-out bg-transparent border-[1px] border-gray-300 outline-none cursor-pointer 2xl:text-base hover:text-white hover:border-white"
                    onClick={(e) => removeComment(e, comment)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="p-4 text-sm text-white bg-gray-600 rounded-3xl min-w-[85px] w-full max-w-[280px] md:max-w-[340px] lg:max-w-[450] xl:max-w-[500px] 2xl:max-w-[550px] 2xl:text-base break-words">
                <p>{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-400 2xl:text-base">
            No one has commented this post yet, be the first to comment!
          </span>
        )}
      </div>
      <form
        className="flex items-center justify-between w-full"
        onSubmit={addComment}
      >
        <div className="flex items-center flex-1 gap-3 mt-2">
          <img
            src={session?.user?.image}
            alt="User Avatar"
            className="object-cover w-8 h-8 rounded-full"
          />
          <textarea
            placeholder="Add a comment"
            value={commentInput || ""}
            onChange={(e) => setCommentInput(e.target.value)}
            rows={2}
            className="text-white border-2 min-h-[60px] max-h-[100px] flex items-center w-full px-4 py-3 text-xs bg-transparent border-gray-600 rounded-lg outline-none 2xl:text-base"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-3 text-xs font-bold text-red-500 transition duration-150 ease-in-out border-none outline-none 2xl:text-base hover:text-red-600 disabled:opacity-40"
          disabled={addingComment || !commentInput}
        >
          {addingComment ? "Adding..." : "Comment"}
        </button>
      </form>
      {isFetching && <Loading />}
    </>
  );
};

export default CommentsBox;
