import React from "react";
import Headbar from "../Headbar";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="font-inter h-screen w-screen flex flex-row justify-between items-center overflow-hidden">
      <Sidebar />
      <main className="h-screen w-full flex flex-col">
        <Headbar />
        <div className="flex flex-col h-screen overflow-y-scroll">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
