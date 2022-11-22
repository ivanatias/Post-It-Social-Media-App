import React from "react";
import UserHeader from "../UserHeader";

const Header = ({ avatarUrl, userTag, userId }) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <h1 className="text-xl font-bold text-white 2xl:text-2xl">Posted by</h1>
      <UserHeader avatarUrl={avatarUrl} userTag={userTag} userId={userId} />
    </div>
  );
};

export default Header;
