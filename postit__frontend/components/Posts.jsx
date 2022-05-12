import React from "react";
import { Post } from "./index";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const Posts = ({ posts }) => {
  return (
    <Masonry
      className="flex w-full px-4 py-3 md:px-8 lg:px-10"
      breakpointCols={breakpointColumnsObj}
    >
      {posts?.map((post) => (
        <Post key={post?._id} post={post && post} />
      ))}
    </Masonry>
  );
};

export default Posts;
