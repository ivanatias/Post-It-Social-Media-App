import React from "react";

const PostContent = ({ postTitle, postDescription, postCategory }) => (
  <>
    <h2 className="text-base font-bold text-white 2xl:text-xl">{postTitle}</h2>
    <p className="text-sm text-white 2xl:text-lg">{postDescription}</p>
    <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
      Category
    </span>
    <span className="flex items-center justify-center px-6 py-2 text-xs text-white bg-gray-800 rounded-lg w-fit 2xl:text-base">
      {postCategory}
    </span>
  </>
);

export default PostContent;
