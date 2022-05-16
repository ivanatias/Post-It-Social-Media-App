import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "./index";

import { HiMenu } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between w-full gap-3 px-6 py-3 bg-black/20 backdrop-blur-md md:px-10 lg:px-12">
      <HiMenu
        fontSize={30}
        className="text-white cursor-pointer md:hidden"
        onClick={() => setShowSidebar(true)}
      />
      <Link href="/">
        <a>
          <Image src="/Postit-logofull.svg" width={140} height={80} />
        </a>
      </Link>

      <div className="relative items-center justify-center hidden sm:flex sm:flex-1 sm:gap-3">
        <AiOutlineSearch fontSize={30} className="text-gray-200" />
        <input
          type="text"
          className="w-full max-w-lg p-2 border-none rounded-md shadow-md outline-none focus-within:shadow-gray-400"
          placeholder="Looking for something?"
        />
      </div>
      <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
        <IoMdAdd fontSize={25} className="text-white" />
      </div>
      {showSidebar && (
        <div className="fixed top-0 left-0 z-10 flex flex-col w-4/5 h-screen md:hidden">
          <AiFillCloseCircle
            fontSize={35}
            className="absolute text-white cursor-pointer right-4 top-4"
            onClick={() => setShowSidebar(false)}
          />
          <Sidebar closeSidebar={closeSidebar} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
