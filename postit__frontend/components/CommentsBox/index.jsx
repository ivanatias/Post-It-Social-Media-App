import React from "react";
import { Loading } from "../../components";
import CommentsContainer from "./CommentsContainer";
import Comment from "./Comment";
import CommentsForm from "./CommentsForm";
import { useField } from "../../hooks/useField.js";
import { useToggle } from "../../hooks/useToggle";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addComment, removeComment } from "../../services/comments";
import { toast } from "react-toastify";

const CommentsBox = ({ comments, refresh, isFetching }) => {
  const {
    value: commentInput,
    handleValueChange: handleCommentChange,
    resetField: resetComment,
  } = useField();

  const { value: addingComment, toggleValue: toggleAddingComment } =
    useToggle();

  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput) return;
    toggleAddingComment();
    try {
      await addComment({
        postId: id,
        userId: session?.user?.uid,
        comment: commentInput,
      });
      refresh();
      toast.success("You added a comment!");
    } catch (err) {
      toast.error(`Couldn't add comment due to an error: ${err.message}`);
    } finally {
      toggleAddingComment();
      resetComment();
    }
  };

  const handleRemoveComment = async (commentKey) => {
    try {
      await removeComment({
        postId: id,
        userId: session?.user?.uid,
        commentKey,
      });
      refresh();
      toast.success("Comment removed");
    } catch (err) {
      toast.error(
        `Couldn't remove the comment due to an error: ${err.message}`
      );
    }
  };

  return (
    <>
      <CommentsContainer hasComments={comments?.length > 0}>
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._key}
              comment={comment}
              removeComment={handleRemoveComment}
            />
          ))
        ) : (
          <span className="text-xs text-gray-400 2xl:text-base">
            No one has commented this post yet, be the first to comment!
          </span>
        )}
      </CommentsContainer>
      <CommentsForm
        onSubmit={handleAddComment}
        onChange={handleCommentChange}
        commentInput={commentInput}
        addingComment={addingComment}
        avatarUrl={session?.user?.image}
      />
      {isFetching && <Loading />}
    </>
  );
};

export default CommentsBox;
