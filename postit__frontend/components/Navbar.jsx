import React from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/login" && (
        <div className="text-xl text-white">Navbar</div>
      )}
    </>
  );
};

export default Navbar;
