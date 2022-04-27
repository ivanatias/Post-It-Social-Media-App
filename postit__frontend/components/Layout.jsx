import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-black">
      {router.pathname !== "/login" && (
        <div className="hidden  md:flex">
          <Sidebar />
        </div>
      )}
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
