import React from "react";
import Image from "next/image";

const CoverImage = ({ firstPostCategory }) => {
  return (
    <div className="relative w-full h-[250px] 2xl:h-[350px]">
      <Image
        layout="fill"
        placeholder="blur"
        blurDataURL={`https://source.unsplash.com/1600x900/?${
          firstPostCategory || "nature"
        }`}
        src={`https://source.unsplash.com/1600x900/?${
          firstPostCategory || "nature"
        }`}
        alt="User-Cover-Pic"
        objectFit="cover"
        priority
      />
    </div>
  );
};

export default CoverImage;
