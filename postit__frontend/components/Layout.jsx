import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
