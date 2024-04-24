import React from "react";
import { Card, Image, Button, Link } from "@nextui-org/react";
import { fitness, tryy } from "@images";
import { LuLogOut } from "react-icons/lu";
import { useLocation } from "react-router-dom";

/*
 const pathname = usePathname();




*/

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  const [selected, setSelected] = React.useState(
    getInitialSelectedIndex(pathname)
  );

  function getInitialSelectedIndex(pathname) {
    switch (pathname) {
      case "/user/":
        return 0;
      case "/user/qrcode":
        return 1;
      case "/user/membership":
        return 2;
      case "/user/transactions":
        return 3;
      case "/user/profile":
        return 4;
      default:
        return 0;
    }
  }

  function handleButtonClick(index) {
    setSelected(index);
  }

  const BaseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5173/";

  return (
    <Card
      shadow="lg"
      className="h-full w-1/6 flex flex-col justify-around p-5 border2 border-purple-800"
    >
      <div className="flex items-center gap-2 mb-8">
        <Image src={fitness} height={30} width={30} />
        <h2 className="text-md tracking-wide text-gray-700 font-medium">
          Fitness Networking
        </h2>
      </div>

      {sidebarItems.map((item, index) => (
        <Button
          as={Link}
          href={`${BaseURL}${item.path}`}
          key={index}
          // radius="full"
          variant="shadow"
          className={`flex justify-start items-center gap-2 text-sm tracking-wide font-medium bg-white ${
            selected === index ? "text-[#1f1c2e]" : "text-gray-700"
          }`}
          onClick={() => handleButtonClick(index)}
          // className=""
        >
          {getIcon(item.label)}
          <span>{item.label}</span>
        </Button>
      ))}

      <Image src={tryy} className="mx-auto border-2 my-10" />

      <Button isIconOnly>
        <LuLogOut size={20} />
      </Button>
    </Card>
  );
}

const sidebarItems = [
  {
    label: "Dashboard",
    path: "user/",
  },
  {
    label: "QR Code",
    path: "user/qrcode",
  },
  {
    label: "Membership",
    path: "user/membership",
  },
  {
    label: "Transactions",
    path: "user/transactions",
  },
  {
    label: "Profile",
    path: "user/profile",
  },
];

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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        </svg>
      );
    case "QR Code":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-qrcode"
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-barbell"
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-transaction-rupee"
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-user"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      );
    default:
      return null;
  }
};
