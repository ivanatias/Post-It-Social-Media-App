import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-black min-h-screen flex">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
