import React from "react";

const Loading = () => (
  <div className="fixed top-0 left-0 z-50 grid w-full h-full bg-black/40 place-content-center">
    <div className="relative md:left-[112px] w-8 h-8 border-4 border-red-500 rounded-full border-l-transparent 2xl:w-10 2xl:h-10 animate-spin"></div>
  </div>
);

export default Loading;
