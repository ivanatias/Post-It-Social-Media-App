import React from "react";

const SubmitButton = ({
  uploadingImage,
  creatingPost,
  wrongImageType,
  isEditingPost,
  editingPostMode,
}) => {
  return (
    <button
      disabled={
        uploadingImage || creatingPost || wrongImageType || isEditingPost
      }
      type="submit"
      className="flex items-center justify-center w-full px-2 py-4 text-base font-bold text-white transition duration-150 bg-red-500 border-none rounded-sm outline-none 2xl:text-lg hover:bg-red-700 disabled:opacity-40"
    >
      {isEditingPost
        ? "Editing post..."
        : editingPostMode
        ? "Edit Post"
        : creatingPost
        ? "Creating post..."
        : "Create Post"}
    </button>
  );
};

export default SubmitButton;
