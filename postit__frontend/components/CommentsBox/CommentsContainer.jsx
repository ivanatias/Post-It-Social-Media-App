import React from "react";

const CommentsContainer = ({ hasComments, children }) => (
  <div
    className={`flex flex-col gap-6  max-h-[500px] overflow-y-auto ${
      hasComments
        ? "bg-gray-800 shadow-md shadow-gray-600 px-4 py-8 rounded-xl"
        : "bg-transparent"
    }`}
  >
    {children}
  </div>
);

export default CommentsContainer;
