import React from "react";

const TextInputs = ({
  postTitle,
  handlePostTitleChange,
  postDescription,
  handlePostDescChange,
}) => (
  <>
    <input
      type="text"
      className="border-[1px] border-gray-100 outline-none p-4 text-white placeholder:text-gray-400 bg-transparent rounded-lg"
      placeholder="Post title"
      value={postTitle}
      onChange={handlePostTitleChange}
    />
    <textarea
      className="max-h-[300px] overflow-y-auto min-h-[150px] border-[1px] border-gray-100 outline-none p-4 text-white placeholder:text-gray-400 bg-transparent rounded-lg"
      rows={4}
      placeholder="What's your post about?"
      value={postDescription}
      onChange={handlePostDescChange}
    />
  </>
);

export default TextInputs;
