import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  AiOutlineDownload,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineSave,
} from "react-icons/ai";

const Dropdown = ({
  setDropdownOpen,
  setOpenModal,
  postedBy,
  postImage,
  postId,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="absolute z-10 flex flex-col gap-2 p-3 bg-white rounded-md right-2 top-14">
      <a
        className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100"
        href={`${postImage?.asset?.url}?dl=`}
        download
        onClick={() => setDropdownOpen(false)}
      >
        <AiOutlineDownload fontSize={16} />
        <p>Download</p>
      </a>
      <div className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100">
        <AiOutlineSave fontSize={16} />
        <p>Save</p>
      </div>
      <div
        className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100"
        onClick={() => {
          setDropdownOpen(false);
          router.push(`/post/${postId}`);
        }}
      >
        <AiOutlineEye fontSize={16} />
        <p>Post Details</p>
      </div>
      {session.user.uid === postedBy?._id && (
        <div
          className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out rounded-md shadow-md cursor-pointer lg:text-sm hover:bg-gray-100"
          onClick={() => {
            setDropdownOpen(false);
            setOpenModal(true);
          }}
        >
          <AiOutlineDelete fontSize={16} />
          <p>Delete</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
