import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { categories } from "../utils/data";

import { useUser } from "../hooks/useUser";

const activeLink = "text-red-600 font-extrabold";

const NavLink = ({ href, children, closeSidebar }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={`transition-all duration-100 ease-in-out hover:text-red-500 ${
          router.pathname === href && activeLink
        }`}
        onClick={closeSidebar}
      >
        {children}
      </a>
    </Link>
  );
};

const Sidebar = ({ closeSidebar }) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-start w-full h-full px-5 py-5 overflow-y-auto shadow-md bg-neutral-900 md:h-screen shadow-gray-100 md:w-56 ">
      <div className="flex items-center justify-center w-20 h-20 rounded-full">
        {user?.image && (
          <NavLink
            href={`/user-profile/${user?._id}`}
            closeSidebar={closeSidebar}
          >
            <Image
              alt="User Avatar Image"
              src={user?.image}
              width={80}
              height={80}
              objectFit="cover"
              className="rounded-full cursor-pointer"
            />
          </NavLink>
        )}
      </div>
      <h1 className="mt-3 text-xl font-bold text-center text-white ">
        {user?.userName}
      </h1>
      <div className="mt-3 text-sm font-semibold text-gray-200">
        <NavLink
          href={`/user-profile/${user?._id}`}
          closeSidebar={closeSidebar}
        >
          Profile
        </NavLink>
      </div>
      <div className="flex flex-col items-center justify-center my-6 font-bold text-white">
        <NavLink href="/" closeSidebar={closeSidebar}>
          Home
        </NavLink>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="mb-3 text-xl font-bold text-white">
          Discover categories
        </h2>
        <div className="flex flex-col items-center justify-center w-full gap-1 font-semibold text-gray-200">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              href={`/category/${category.name}`}
              closeSidebar={closeSidebar}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
