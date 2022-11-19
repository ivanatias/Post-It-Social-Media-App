import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loading, UserHeader } from "../../components";
import CommentsContainer from "./CommentsContainer";
import Comment from "./Comment";
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

  const removeComment = (commentKey) => {
    axios
      .post("/api/comments/removeComment", {
        postId: id,
        userId: session?.user?.uid,
        commentKey,
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
      <CommentsContainer hasComments={comments.length > 0}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._key}
              comment={comment}
              removeComment={removeComment}
            />
          ))
        ) : (
          <span className="text-xs text-gray-400 2xl:text-base">
            No one has commented this post yet, be the first to comment!
          </span>
        )}
      </CommentsContainer>

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
