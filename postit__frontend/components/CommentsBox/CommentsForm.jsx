import React from "react";
import { UserAvatar } from "../../components";

const CommentsForm = ({
  onSubmit,
  onChange,
  commentInput,
  addingComment,
  avatarUrl,
}) => (
  <form
    className="flex items-center justify-between w-full"
    onSubmit={onSubmit}
  >
    <div className="flex items-center flex-1 gap-3 mt-2">
      {avatarUrl && <UserAvatar avatarUrl={avatarUrl} />}
      <textarea
        placeholder="Add a comment"
        value={commentInput}
        onChange={onChange}
        rows={2}
        className="text-white border-2 min-h-[60px] max-h-[100px] flex items-center w-full px-4 py-3 text-xs bg-transparent border-gray-600 rounded-lg outline-none 2xl:text-base"
      />
    </div>
    <button
      type="submit"
      className="px-4 py-3 text-xs font-bold text-red-500 transition duration-150 ease-in-out border-none outline-none 2xl:text-base hover:text-red-600 disabled:opacity-40"
      disabled={addingComment || !commentInput}
    >
      {addingComment ? "Adding..." : "Comment"}
    </button>
  </form>
);

export default CommentsForm;
