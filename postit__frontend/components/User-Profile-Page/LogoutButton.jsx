import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => (
  <div className="flex items-center justify-center w-full">
    <button
      type="button"
      className="mt-2 w-full max-w-[120px] rounded-lg text-base 2xl:text-lg text-white font-bold border-none outline-none bg-red-500 p-2 flex items-center justify-center transition duration-150 hover:bg-red-700"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Logout
    </button>
  </div>
);

export default LogoutButton;
