import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="relative w-full h-screen overflow-y-scroll hide-scrollbar">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
