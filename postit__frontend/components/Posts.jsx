import React from "react";
import { Post } from "./index";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  3000: 5,
  2000: 4,
  1600: 3,
  1200: 2,
  640: 1,
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
