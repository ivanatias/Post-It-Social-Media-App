import React from "react";
import { UserHeader } from "../components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const SavedByBox = ({ saved, setOpenSavedByBox }) => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 z-50 grid w-full h-full bg-black/40 place-content-center">
      <div className="relative flex flex-col items-center min-w-[270px] max-h-[500px] overflow-y-auto p-5 text-black shadow-md md:left-[112px] bg-neutral-900 rounded-2xl">
        <div className="flex items-center justify-between w-full mb-5">
          <span className="text-base font-bold text-white 2xl:text-lg">
            Saved by
          </span>
          <AiFillCloseCircle
            fontSize={25}
            className="text-white cursor-pointer"
            aria-label="Close"
            onClick={() => setOpenSavedByBox(false)}
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          {saved?.map((item) => (
            <UserHeader
              key={item._key}
              avatarUrl={item.postedBy.image}
              userTag={item.postedBy.userTag}
              userId={item.postedBy._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedByBox;
