import React, { useState } from "react";
import { Loading } from "../../components";
import CommentsContainer from "./CommentsContainer";
import Comment from "./Comment";
import CommentsForm from "./CommentsForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

const CommentsBox = ({ comments, refresh, isFetching }) => {
  const [commentInput, setCommentInput] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

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
      <CommentsForm
        onSubmit={addComment}
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
