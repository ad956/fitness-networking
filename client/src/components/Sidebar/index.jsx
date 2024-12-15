import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { fitness } from "@images";
import {
  LuLayoutDashboard,
  LuQrCode,
  LuDumbbell,
  LuWallet,
  LuUser,
} from "react-icons/lu";

export default function Sidebar() {
  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <LuLayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      label: "QR Code",
      icon: <LuQrCode className="w-5 h-5" />,
      path: "/qr-code",
    },
    {
      label: "Membership",
      icon: <LuDumbbell className="w-5 h-5" />,
      path: "/membership",
    },
    {
      label: "Transactions",
      icon: <LuWallet className="w-5 h-5" />,
      path: "/transactions",
    },
    {
      label: "Profile",
      icon: <LuUser className="w-5 h-5" />,
      path: "/profile",
    },
  ];

  return (
    <div className="h-full w-56 bg-white shadow-md flex flex-col relative p-5">
      <div className="flex gap-2 items-center mb-8">
        <Image src={fitness} height={40} width={40} alt="Fitness Networking" />
        <p className="text-sm font-semibold text-gray-800">
          Fitness Networking
        </p>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {sidebarItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-warning-100 text-warning-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
