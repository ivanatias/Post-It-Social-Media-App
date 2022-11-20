import React from "react";

const FileInput = ({ onChange, postImage }) => {
  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="upload-image"
        className="text-gray-100 hover:text-white hover:border-white border-[1px] rounded-lg border-gray-100 px-4 py-1 transition duration-150 text-sm 2xl:text-base cursor-pointer"
      >
        {postImage ? "Replace image" : "Upload image"}
      </label>
      <input
        type="file"
        name="upload-image"
        id="upload-image"
        className="w-0 h-0"
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
