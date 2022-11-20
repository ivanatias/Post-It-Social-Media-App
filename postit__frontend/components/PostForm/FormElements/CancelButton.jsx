import React from "react";

const CancelButton = ({ setEditingPostMode }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full text-base text-gray-300 transition duration-150 2xl:text-lg hover:text-white"
      onClick={() => setEditingPostMode(false)}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
