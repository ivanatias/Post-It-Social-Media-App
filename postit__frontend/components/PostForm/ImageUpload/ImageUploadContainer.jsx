import React from "react";

const ImageUploadContainer = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <div
        className={`relative w-full mt-5 h-[450px] max-w-2xl rounded-2xl border-2 border-gray-300 flex flex-col items-center justify-center bg-transparent`}
      >
        {children}
      </div>
    </div>
  );
};

export default ImageUploadContainer;
