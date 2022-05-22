import { postsQuery } from "./data";
import axios from "axios";

export const fetchAllPosts = async () => {
  try {
    const query = postsQuery();
    const response = await axios.post("/api/posts/getPosts", {
      posts: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
