import React from "react";
import Sidebar from "../Sidebar";
import Headbar from "../Headbar";

const Layout = ({ children }) => {
  return (
    <div className="font-inter h-screen w-screen flex flex-row justify-between items-center overflow-hidden">
      <Sidebar />
      <main className="h-screen w-full flex flex-col overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};

export default Layout;
