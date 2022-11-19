import React from "react";
import Image from "next/image";

const UserAvatar = ({ avatarUrl }) => {
  return (
    <Image
      src={avatarUrl}
      alt="User Avatar"
      width={32}
      height={32}
      className="object-cover rounded-full"
    />
  );
};

export default UserAvatar;
