import React from "react";

const CancelButton = ({ toggleEditingPostMode }) => (
  <button
    type="button"
    className="flex items-center justify-center w-full text-base text-gray-300 transition duration-150 2xl:text-lg hover:text-white"
    onClick={() => toggleEditingPostMode()}
  >
    Cancel
  </button>
);

export default CancelButton;
