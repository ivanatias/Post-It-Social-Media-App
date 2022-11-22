import axios from "axios";

export const editPost = ({
  postId,
  postTitle,
  postDescription,
  postCategory,
}) =>
  axios.post("/api/posts/editPost", {
    postId,
    postTitle,
    postDescription,
    postCategory,
  });
