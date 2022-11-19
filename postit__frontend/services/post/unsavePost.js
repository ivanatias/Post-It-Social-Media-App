import axios from "axios";

export const unsavePost = ({ postId, userId }) =>
  axios.post(`/api/posts/unsavePost?postId=${postId}&userId=${userId}`);
