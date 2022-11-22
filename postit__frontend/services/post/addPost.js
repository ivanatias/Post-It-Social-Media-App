import axios from "axios";

export const addPost = ({
  postImage,
  postTitle,
  postDescription,
  postCategory,
  userId,
}) =>
  axios.post("/api/posts/createPost", {
    postImage,
    postTitle,
    postDescription,
    postCategory,
    userId,
  });
