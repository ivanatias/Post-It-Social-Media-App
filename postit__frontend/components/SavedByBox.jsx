import React from "react";
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
            <div
              key={item._key}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => router.push(`/user/${item.postedBy._id}`)}
              aria-description="Go to user profile page"
            >
              <img
                src={item.postedBy.image}
                alt="User Avatar"
                className="object-cover w-8 h-8 rounded-full"
              />
              <span className="text-sm font-bold text-white 2xl:text-base">
                {item.postedBy.userTag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedByBox;
