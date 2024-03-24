import { MdOutlineDashboard } from "react-icons/md";
import { LiaQrcodeSolid } from "react-icons/lia";

export default function Sidebar() {
  return (
    <div className="flex flex-col">
      {sidebarItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {getIcon(item.label)}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "QR Code",
    path: "/qrcode",
  },
  {
    label: "Membership",
    path: "/membership",
  },
  {
    label: "Transactions",
    path: "/transactions",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];

const getIcon = (label) => {
  switch (label) {
    case "Dashboard":
      return <MdOutlineDashboard />;
    case "QR Code":
      return <LiaQrcodeSolid />;
    case "Membership":
      return <LiaQrcodeSolid />;
    case "Transactions":
      return <MdOutlineDashboard />;
    case "Settings":
      return <LiaQrcodeSolid />;
    default:
      return null;
  }
};
