import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { categories } from "../utils/data";
import { useSession } from "next-auth/react";

const activeLink = "text-red-600 font-extrabold";

const NavLink = ({ href, children, closeSidebar }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={`transition-all duration-100 ease-in-out hover:text-red-500 last:mt-2 ${
          router.asPath === href && activeLink
        }`}
        onClick={closeSidebar}
      >
        {children}
      </a>
    </Link>
  );
};

const Sidebar = ({ closeSidebar }) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center w-full h-full p-5 overflow-y-auto shadow-md hide-scrollbar bg-neutral-900 md:h-screen shadow-gray-100 md:shadow-none md:w-56 md:justify-start ">
      <div className="flex items-center justify-center w-20 h-20 rounded-full">
        {session?.user?.image && (
          <NavLink
            href={`/user/${session?.user?.uid}`}
            closeSidebar={closeSidebar}
          >
            <Image
              alt="User Avatar Image"
              src={session?.user?.image}
              width={80}
              height={80}
              objectFit="cover"
              className="rounded-full cursor-pointer"
            />
          </NavLink>
        )}
      </div>
      <h1 className="mt-3 text-xl font-bold text-center text-white ">
        {session?.user?.name}
      </h1>
      <div className="mt-3 text-sm font-semibold text-gray-200">
        <NavLink
          href={`/user/${session?.user?.uid}`}
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
        <h2 className="mb-3 text-lg font-bold text-center text-white">
          Discover categories
        </h2>
        <div className="flex flex-col items-center justify-center w-full gap-2 font-semibold text-gray-200">
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
