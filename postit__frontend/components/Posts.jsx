import React from "react";
import { Post } from "./index";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  3000: 5,
  2000: 4,
  1440: 3,
  1000: 2,
  540: 1,
};

const Posts = ({ posts }) => {
  return (
    <Masonry
      className="flex w-full h-full"
      breakpointCols={breakpointColumnsObj}
    >
      {posts?.map((post) => (
        <Post key={post?._id} post={post && post} />
      ))}
    </Masonry>
  );
};

export default Posts;
