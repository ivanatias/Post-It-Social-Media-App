import React from "react";
import { Post } from "./index";
import { useRefresh } from "../hooks/useRefresh";
import Masonry from "react-masonry-css";
import { Loading } from "../components";

const breakpointColumnsObj = {
  default: 5,
  3000: 5,
  2000: 4,
  1600: 3,
  1200: 2,
  640: 1,
};

const Posts = ({ posts }) => {
  const { isRefreshing, refreshData } = useRefresh(posts);
  return (
    <Masonry
      className="flex w-full h-full"
      breakpointCols={breakpointColumnsObj}
    >
      {posts?.map((post) => (
        <Post key={post?._id} post={post} refreshData={refreshData} />
      ))}
      {isRefreshing && <Loading />}
    </Masonry>
  );
};

export default Posts;
