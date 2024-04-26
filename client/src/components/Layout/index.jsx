import React from "react";
import Sidebar from "../Sidebar";
import Headbar from "../Headbar";
import { Card } from "@nextui-org/react";

const Layout = ({ children }) => {
  return (
    <div className="font-inter h-screen w-screen flex flex-row justify-between items-center">
      <Sidebar />
      <main className="h-screen w-full flex flex-col">{children}</main>
    </div>
  );
};

export default Layout;
