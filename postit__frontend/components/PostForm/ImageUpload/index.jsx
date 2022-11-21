import React from "react";
import UploadedImage from "./UploadedImage";
import UploadText from "./UploadText";
import UploadingText from "./UploadingText";
import WrongImageText from "./WrongImageText";

const ImageUpload = ({ uploadingImage, wrongImageType, imageUrl }) => {
  if (uploadingImage) {
    return <UploadingText />;
  }

  if (imageUrl) {
    return <UploadedImage imageUrl={imageUrl} />;
  }

  if (wrongImageType) {
    return <WrongImageText />;
  }

  return <UploadText />;
};

export default ImageUpload;
