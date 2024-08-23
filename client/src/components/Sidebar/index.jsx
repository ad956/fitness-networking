import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { fitness } from "@images";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@features/auth/authSlice";
import toast from "react-hot-toast";
import { useLogout } from "@queries/authQueries";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.user?.role);

  const { mutate: logoutMutate, isLoading } = useLogout(userRole);

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        // Clear Redux state
        dispatch(clearUser());

        // Clear localStorage
        localStorage.removeItem("userRole");
        localStorage.removeItem("isAuthenticated");

        toast.success("Logged out successfully");
        navigate("/login");
      },
      onError: (error) => {
        toast.error("Logout failed: " + error.message);
      },
    });
  };

  const sidebarItems = [
    { label: "Dashboard", path: "/user/dashboard", icon: getIcon("Dashboard") },
    { label: "QR Code", path: "/user/qrcode", icon: getIcon("QRCode") },
    {
      label: "Membership",
      path: "/user/membership",
      icon: getIcon("Membership"),
    },
    {
      label: "Transactions",
      path: "/user/transactions",
      icon: getIcon("Transactions"),
    },
    { label: "Profile", path: "/user/profile", icon: getIcon("Profile") },
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

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mt-auto text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <LuLogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}

const getIcon = (label) => {
  switch (label) {
    case "Dashboard":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        </svg>
      );
    case "QRCode":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-qrcode"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M7 17l0 .01" />
          <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M7 7l0 .01" />
          <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M17 7l0 .01" />
          <path d="M14 14l3 0" />
          <path d="M20 14l0 .01" />
          <path d="M14 14l0 3" />
          <path d="M14 20l3 0" />
          <path d="M17 17l3 0" />
          <path d="M20 17l0 3" />
        </svg>
      );
    case "Membership":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-barbell"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M2 12h1" />
          <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" />
          <path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
          <path d="M9 12h6" />
          <path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
          <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" />
          <path d="M22 12h-1" />
        </svg>
      );
    case "Transactions":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-transaction-rupee"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M21 12h-6h1a3 3 0 0 1 0 6h-1l3 3" />
          <path d="M15 15h6" />
          <path d="M5 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M7 5h8" />
          <path d="M7 5v8a3 3 0 0 0 3 3h1" />
        </svg>
      );
    case "Profile":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
      );
    default:
      return null;
  }
};
