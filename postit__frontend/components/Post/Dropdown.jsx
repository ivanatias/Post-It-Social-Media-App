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
  saveOrUnsavePost,
  saving,
  unsaving,
  alreadySaved,
  refreshData,
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
      <button
        className={`flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out border-none rounded-md shadow-md outline-none cursor-pointer lg:text-sm hover:bg-gray-100 ${
          alreadySaved?.length > 0 && "text-red-500"
        }`}
        onClick={() => {
          saveOrUnsavePost(postId);
          refreshData();
        }}
      >
        <AiOutlineSave fontSize={16} />
        <p>
          {saving
            ? "Saving..."
            : unsaving
            ? "Unsaving"
            : alreadySaved?.length > 0
            ? "Saved"
            : "Save"}
        </p>
      </button>
      <button
        className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out border-none rounded-md shadow-md outline-none cursor-pointer lg:text-sm hover:bg-gray-100"
        onClick={() => {
          setDropdownOpen(false);
          router.push(`/post/${postId}`);
        }}
      >
        <AiOutlineEye fontSize={16} />
        <p>Post Details</p>
      </button>
      {session?.user?.uid === postedBy?._id && (
        <button
          className="flex items-center gap-2 px-2 py-3 text-xs font-semibold transition duration-150 ease-in-out border-none rounded-md shadow-md outline-none cursor-pointer lg:text-sm hover:bg-gray-100"
          onClick={() => {
            setDropdownOpen(false);
            setOpenModal(true);
          }}
        >
          <AiOutlineDelete fontSize={16} />
          <p>Delete</p>
        </button>
      )}
    </div>
  );
};

export default Dropdown;
