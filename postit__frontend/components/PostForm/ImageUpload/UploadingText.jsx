import React from "react";

const UploadingText = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-bold text-gray-400 2xl:text-base">
        Uploading...
      </p>
      <p className="mt-2 text-xs text-gray-400 2xl:text-sm">
        Please wait for a few seconds
      </p>
    </div>
  );
};

export default UploadingText;
