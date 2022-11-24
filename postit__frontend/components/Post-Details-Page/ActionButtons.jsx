import React from "react";

const ActionButtons = ({ toggleEditingPostMode, toggleOpenModal }) => (
  <div className="flex items-center justify-center w-full gap-5">
    <button
      type="button"
      className="flex items-center justify-center px-4 py-2 text-base text-gray-300 transition duration-150 border-none outline-none cursor-pointer 2xl:text-lg hover:text-white"
      onClick={toggleEditingPostMode}
    >
      Edit
    </button>
    <button
      type="button"
      className="flex items-center justify-center px-4 py-2 text-base text-red-500 transition duration-150 border-none rounded-lg outline-none cursor-pointer 2xl:text-lg hover:text-red-600"
      onClick={toggleOpenModal}
    >
      Delete
    </button>
  </div>
);

export default ActionButtons;
