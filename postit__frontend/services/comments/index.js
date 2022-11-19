import axios from "axios";

const addComment = ({ postId, userId, comment }) =>
  axios.post("/api/comments/addComment", {
    postId,
    userId,
    comment,
  });

const removeComment = ({ postId, userId, commentKey }) =>
  axios.post("/api/comments/removeComment", {
    postId,
    userId,
    commentKey,
  });

export { addComment, removeComment };
