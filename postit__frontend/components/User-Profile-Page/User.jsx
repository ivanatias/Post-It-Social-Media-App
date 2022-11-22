import React from "react";
import Image from "next/image";

const User = ({ imageUrl, username }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white 2xl:text-4xl">
        {username}
      </h1>
      <div className="flex items-center justify-center p-1 rounded-full ring-2 ring-gray-100 w-60 h-60 2xl:w-80 2xl:h-80">
        {imageUrl && (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              layout="fill"
              className="rounded-full"
              alt="User Avatar"
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default User;
