import React from "react";

const SavedByUsers = ({ numOfSaves, toggleSavedByBox, saves }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
        Saved by ({numOfSaves})
      </span>
      {numOfSaves > 0 ? (
        <div
          className="flex flex-wrap items-center cursor-pointer max-w-[250px]"
          onClick={toggleSavedByBox}
          aria-label="Users who saved this post"
        >
          {saves
            .map((item) => (
              <img
                key={item._key}
                src={item.postedBy.image}
                alt="User Avatar"
                className="object-cover w-8 h-8 rounded-full mr-[-6px]"
              />
            ))
            .slice(0, 6)
            .concat(
              <span
                key={"dots"}
                className={`h-8 ml-2 text-xl text-white ${
                  numOfSaves < 6 && "hidden"
                }`}
              >
                ...
              </span>
            )}
        </div>
      ) : (
        <span className="text-xs text-gray-400 2xl:text-base">
          No one has saved this post yet...
        </span>
      )}
    </div>
  );
};

export default SavedByUsers;
