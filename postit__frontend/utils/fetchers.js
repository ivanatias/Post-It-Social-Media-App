import { postsQuery, postQuery, postsByCategoryQuery } from "./data";
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

export const fetchPost = async (postId) => {
  try {
    const query = postQuery(postId);
    const response = await axios.post("/api/posts/getPost", {
      post: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsByCategory = async (category, postId) => {
  try {
    const query = postsByCategoryQuery(category, postId);
    const response = await axios.post("/api/posts/getPosts", {
      posts: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
