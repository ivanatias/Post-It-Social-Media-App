import React from "react";

const Comments = ({ numOfComments }) => {
  return (
    <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
      Comments ({numOfComments})
    </span>
  );
};

export default Comments;
