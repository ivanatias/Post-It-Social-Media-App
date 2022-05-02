import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import { AiFillHome } from "react-icons/ai";

import axios from "axios";
import { useRouter } from "next/router";

const activeLink = "text-red-500 font-extrabold";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const apiGetUser = useCallback(async (userId) => {
    try {
      axios.post(`/api/users/getUser?googleId=${userId}`).then((response) => {
        setUser(response.data[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const apiCategories = useCallback(async () => {
    try {
      axios.post(`/api/categories`).then((response) => {
        setCategories(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    apiGetUser(userInfo?.googleId);
    apiCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen p-5 overflow-y-auto bg-gray-200 shadow-md w-52 shadow-gray-100 ">
      <div className="flex items-center justify-center w-20 h-20 rounded-full">
        {user?.image && (
          <Link href={`/user-profile/${user?._id}`}>
            <a className="relative w-full h-full">
              <Image
                alt="User Avatar Image"
                src={user.image}
                layout="fill"
                objectFit="cover"
                className="rounded-full cursor-pointer"
              />
            </a>
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center justify-center my-6">
        <Link href="/">
          <a className="flex items-center justify-center font-bold text-black group">
            <AiFillHome
              fontSize={21}
              className={`mr-2 ${router.pathname === "/" && activeLink}`}
            />
            Home
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h3 className="font-bold text-black">Discover categories</h3>
        <div className="flex flex-col items-center justify-center gap-1 mt-6 font-semibold text-black">
          {categories.map(({ _id, category }) => (
            <Link key={_id} href={`/category/${category}`}>
              <a
                className={`transition-all duration-100 ease-in-out hover:text-red-500 ${
                  router.pathname === `/category/${category}` && activeLink
                }`}
              >
                {category}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
