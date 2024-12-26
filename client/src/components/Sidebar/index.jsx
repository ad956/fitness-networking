import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, cn, Image } from "@nextui-org/react";
import { fitness } from "@images";
import {
  LuLayoutDashboard,
  LuQrCode,
  LuDumbbell,
  LuWallet,
  LuUser,
  LuSettings,
  LuLogOut,
  LuGithub,
} from "react-icons/lu";
import { useLogout } from "@hooks";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Settings } from "@components";

export default function Sidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { logout, isLoading } = useLogout();

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <LuLayoutDashboard className="w-5 h-5" />,
      path: "/user/dashboard",
    },
    {
      label: "QR Code",
      icon: <LuQrCode className="w-5 h-5" />,
      path: "/user/qr-code",
    },
    {
      label: "Membership",
      icon: <LuDumbbell className="w-5 h-5" />,
      path: "/user/membership",
    },
    {
      label: "Transactions",
      icon: <LuWallet className="w-5 h-5" />,
      path: "/user/transactions",
    },
    {
      label: "Profile",
      icon: <LuUser className="w-5 h-5" />,
      path: "/user/profile",
    },
  ];

  return (
    <>
      <div className="relative h-full w-64 bg-white shadow-xl flex flex-col p-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1.6" fill="#4F46E5" />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            />
          </svg>
        </div>

        <div className="flex gap-2 items-center mb-8">
          <Image
            src={fitness}
            height={40}
            width={40}
            alt="Fitness Networking"
          />
          <p className="text-sm font-semibold text-gray-800">
            Fitness Networking
          </p>
        </div>

        <nav className="relative flex flex-col gap-2 flex-grow">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ease-out group relative",
                    "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
                      : "text-gray-600"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative transition-transform duration-300 ease-out group-hover:scale-110">
                      {item.icon}
                      <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-300" />
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="relative mt-4 space-y-2 pt-4 border-t border-gray-100">
          <NavLink
            to="#"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 group transition-all duration-300"
          >
            <LuSettings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            <span className="text-sm font-medium">Settings</span>
          </NavLink>

          <button
            onClick={logout}
            disabled={isLoading}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 group transition-all duration-300",
              isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-red-50"
            )}
          >
            {isLoading ? (
              <span className="loader w-5 h-5 border-2 border-t-red-500 border-gray-200 rounded-full animate-spin"></span>
            ) : (
              <LuLogOut className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            )}
            <span className="text-sm font-medium">
              {isLoading ? "Logging out..." : "Log Out"}
            </span>
          </button>
        </div>

        {/* GitHub and Social Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-center gap-4 bg-gray-50 py-3 rounded-lg"
        >
          <a
            href="https://github.com/ad956/fitness-networking"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-400 hover:text-gray-600 hover:drop-shadow-md transition-all duration-300"
          >
            <LuGithub className="h-5 w-5" />
          </a>
          <div className="text-sm text-gray-400 animate-bounce">⚡️</div>
        </motion.div>
        <Toaster />
      </div>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
