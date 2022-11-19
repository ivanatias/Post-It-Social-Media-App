import React from "react";
import { useRouter } from "next/router";
import UserAvatar from "./UserAvatar";

const UserHeader = ({ avatarUrl, userTag, userId }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer w-fit"
      onClick={() => router.push(`/user/${userId}`)}
      aria-label="Visit user profile"
    >
      <UserAvatar avatarUrl={avatarUrl} />
      <div className="text-sm font-bold text-white 2xl:text-base">
        {userTag}
      </div>
    </div>
  );
};

export default UserHeader;
