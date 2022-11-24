import React from "react";
import Image from "next/image";

const UploadedImage = ({ imageUrl }) => (
  <Image
    src={imageUrl}
    placeholder="blur"
    blurDataURL={imageUrl}
    layout="fill"
    alt="Image uploaded by user"
    className="rounded-2xl"
    objectFit="contain"
  />
);

export default UploadedImage;
