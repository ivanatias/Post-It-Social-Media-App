import React from "react";
import ImageUploadContainer from "./ImageUploadContainer";
import UploadedImage from "./UploadedImage";
import UploadText from "./UploadText";
import UploadingText from "./UploadingText";
import WrongImageText from "./WrongImageText";

const ImageUpload = ({ uploadingImage, wrongImageType, imageUrl }) => {
  return (
    <ImageUploadContainer>
      {uploadingImage ? (
        <UploadingText />
      ) : imageUrl ? (
        <UploadedImage imageUrl={imageUrl} />
      ) : wrongImageType ? (
        <WrongImageText />
      ) : (
        <UploadText />
      )}
    </ImageUploadContainer>
  );
};

export default ImageUpload;
