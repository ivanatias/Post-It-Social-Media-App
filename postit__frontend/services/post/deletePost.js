import axios from "axios";

export const deletePost = (postId) =>
  axios.post("/api/posts/deletePost", {
    postId,
  });
