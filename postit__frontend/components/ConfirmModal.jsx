import React from "react";

const ConfirmModal = ({ deletePost, postId, toggleModal }) => (
  <div className="fixed top-0 left-0 z-50 grid w-full h-full bg-black/40 place-content-center">
    <div className="relative flex flex-col items-center justify-center w-full max-w-md p-5 text-black shadow-md md:left-[112px] bg-neutral-900 rounded-2xl">
      <p className="font-bold text-white text-md 2xl:text-lg">
        Do you want to delete your post?
      </p>
      <div className="flex items-center justify-around gap-5 mt-5">
        <button
          className="flex items-center justify-center px-5 py-2 text-sm font-semibold text-gray-200 transition duration-150 ease-in-out bg-transparent border-none outline-none cursor-pointer 2xl:text-base hover:text-white"
          onClick={() => toggleModal()}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center px-5 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out bg-red-600 border-none outline-none cursor-pointer rounded-2xl 2xl:text-base hover:bg-red-700"
          onClick={() => {
            deletePost(postId);
            toggleModal();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
