import React from "react";
import Image from "next/image";

const PostImage = ({ imageUrl }) => (
  <div className="flex items-center justify-center">
    <div className="relative w-full max-w-lg post__image-container">
      {imageUrl && (
        <Image
          src={imageUrl}
          placeholder="blur"
          blurDataURL={imageUrl}
          className="rounded-lg post__image"
          layout="fill"
          objectFit="contain"
          alt="User's post image"
          priority
        />
      )}
    </div>
  </div>
);

export default PostImage;
