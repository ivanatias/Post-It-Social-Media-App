import axios from "axios";

export const saveOrUnsavePost = ({ postId, userId, action }) =>
  axios.post(
    `/api/posts/saveOrUnsavePost?postId=${postId}&userId=${userId}&action=${action}`
  );
