import React from "react";
import Posts from "../Posts";

const PostsList = ({
  numOfPosts,
  descText,
  username,
  posts,
  refresh,
  isFetching,
}) => {
  const noPostsText = descText.includes("Saved")
    ? "This user has not saved any post yet."
    : "This user has not posted anything yet.";

  return (
    <div className="flex flex-col w-full gap-2 mt-5">
      <span className="text-base font-bold text-white 2xl:text-xl">
        {descText} {username} ({numOfPosts})
      </span>
      {numOfPosts > 0 ? (
        <Posts posts={posts} refresh={refresh} isFetching={isFetching} />
      ) : (
        <p className="w-full text-sm text-gray-400 2xl:text-lg">
          {noPostsText}
        </p>
      )}
    </div>
  );
};

export default PostsList;
