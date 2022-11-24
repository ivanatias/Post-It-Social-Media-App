import React from "react";
import { UserHeader } from "../../components";
import { useSession } from "next-auth/react";

const Comment = ({ comment: { postedBy, comment, _key }, removeComment }) => {
  const { data: session } = useSession();

  return (
    <div key={_key} className="flex flex-col gap-3 w-fit">
      <div className="flex items-center gap-2">
        <UserHeader
          avatarUrl={postedBy.image}
          userTag={postedBy.userTag}
          userId={postedBy._id}
        />
        {session?.user?.uid === postedBy._id && (
          <button
            type="button"
            className="rounded-xl flex items-center justify-center px-2 py-1 ml-2 text-sm text-gray-300 transition duration-150 ease-in-out bg-transparent border-[1px] border-gray-300 outline-none cursor-pointer 2xl:text-base hover:text-white hover:border-white"
            onClick={() => removeComment(_key)}
          >
            Delete
          </button>
        )}
      </div>
      <div className="p-4 text-sm text-white bg-gray-600 rounded-3xl min-w-[85px] w-full max-w-[280px] md:max-w-[340px] lg:max-w-[450] xl:max-w-[500px] 2xl:max-w-[550px] 2xl:text-base break-words">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
