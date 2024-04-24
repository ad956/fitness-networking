import React from "react";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-row justify-between items-center border2 border-red-800">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
