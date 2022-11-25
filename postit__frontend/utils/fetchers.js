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
  const query = postsQuery();
  const response = await axios.post("/api/posts/getPosts", {
    posts: query,
  });
  return response.data;
};

export const fetchPost = async (postId) => {
  const query = postQuery(postId);
  const response = await axios.post("/api/posts/getPost", {
    post: query,
  });
  return response.data[0];
};

export const fetchPostsByCategory = async (category, postId) => {
  const query = postsByCategoryQuery(category, postId);
  const response = await axios.post("/api/posts/getPosts", {
    posts: query,
  });
  return response.data;
};

export const fetchUser = async (userId) => {
  const query = userQuery(userId);
  const response = await axios.post("/api/users/getUser", {
    user: query,
  });
  return response.data[0];
};

export const fetchPostsByUser = async (userId) => {
  const query = postsByUserQuery(userId);
  const response = await axios.post("/api/posts/getPosts", {
    posts: query,
  });
  return response.data;
};

export const fetchPostsSavedByUser = async (userId) => {
  const query = postsSavedByUserQuery(userId);
  const response = await axios.post("/api/posts/getPosts", {
    posts: query,
  });
  return response.data;
};

export const fetchSearchedPosts = async (searchTerm) => {
  const query = searchPostQuery(searchTerm.toLowerCase());
  const response = await axios.post("/api/posts/getPosts", {
    posts: query,
  });
  return response.data;
};
