import React from "react";
import UserHeader from "../UserHeader";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const PostHeader = ({
  avatarUrl,
  userTag,
  userId,
  toggleDropdownOpen,
  dropdownOpen,
}) => (
  <div className="flex items-center justify-between w-full mb-3">
    <UserHeader avatarUrl={avatarUrl} userTag={userTag} userId={userId} />
    <div
      className="flex items-center justify-center w-5 h-5 transition duration-150 ease-in-out bg-white rounded-sm cursor-pointer hover:bg-gray-200"
      onClick={() => toggleDropdownOpen()}
      aria-label="Toggle Dropdown"
    >
      {dropdownOpen ? (
        <HiOutlineChevronUp fontSize={16} />
      ) : (
        <HiOutlineChevronDown fontSize={16} />
      )}
    </div>
  </div>
);

export default PostHeader;
