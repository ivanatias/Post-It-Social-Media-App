import axios from "axios";

export const savePost = ({ postId, userId }) =>
  axios.post(`/api/posts/savePost?postId=${postId}&userId=${userId}`);
