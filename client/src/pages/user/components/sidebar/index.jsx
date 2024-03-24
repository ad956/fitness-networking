export default function Sidebar() {
  return (
    <div className="flex flex-col">
      {sidebarItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {getIconForLabel(item.label)}
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
      return <FaChartLine />;
    case "QR Code":
      return <FaQrcode />;
    case "Membership":
      return <FaUserFriends />;
    case "Transactions":
      return <FaExchangeAlt />;
    case "Settings":
      return <FaCog />;
    default:
      return null;
  }
};
