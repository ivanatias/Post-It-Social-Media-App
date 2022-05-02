import React from "react";

const initialPageLoadClass =
  "flex flex-col h-screen w-full bg-black text-gray-300 items-center justify-center";

const normalSpinnerLoadClass =
  "flex flex-col justify-center items-center h-full w-full text-gray-300";

const Loading = ({ isInitialLoad, message }) => {
  return (
    <div
      className={isInitialLoad ? initialPageLoadClass : normalSpinnerLoadClass}
    >
      <div className="w-24 h-24 rounded-full bg-gray-100 border-l-8 border-l-red-500 animate-spin mb-6"></div>
      <div className="text-2xl text-gray-300 font-semibold">{message}</div>
    </div>
  );
};

export default Loading;
