import {
  postsQuery,
  postQuery,
  postsByCategoryQuery,
  userQuery,
  postsByUserQuery,
  postsSavedByUserQuery,
  searchPostQuery,
} from "./data";
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
    return response.data[0];
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

export const fetchUser = async (userId) => {
  try {
    const query = userQuery(userId);
    const response = await axios.post("/api/users/getUser", {
      user: query,
    });
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsByUser = async (userId) => {
  try {
    const query = postsByUserQuery(userId);
    const response = await axios.post("/api/posts/getPosts", {
      posts: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsSavedByUser = async (userId) => {
  try {
    const query = postsSavedByUserQuery(userId);
    const response = await axios.post("/api/posts/getPosts", {
      posts: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchedPosts = async (searchTerm) => {
  try {
    const query = searchPostQuery(searchTerm.toLowerCase());
    const response = await axios.post("/api/posts/getPosts", {
      posts: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
