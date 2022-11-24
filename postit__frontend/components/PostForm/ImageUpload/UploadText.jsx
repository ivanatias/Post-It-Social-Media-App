import React from "react";
import { AiOutlineUpload } from "react-icons/ai";

const UploadText = () => (
  <div className="flex flex-col items-center">
    <AiOutlineUpload fontSize={150} className="text-gray-100" />
    <p className="text-sm text-center text-gray-400 2xl:text-base">
      You can upload an image with a JPEG, PNG, GIF, SVG, or TIFF format.
    </p>
    <p className="mt-5 text-xs font-bold text-center text-gray-400 2xl:text-sm">
      High Quality images with less than 20MB are recommended.
    </p>
  </div>
);

export default UploadText;
