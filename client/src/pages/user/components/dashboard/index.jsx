import React from "react";
import { Card, User, Progress } from "@nextui-org/react";
import {
  IoNotificationsOutline,
  IoFitnessOutline,
  IoWalletOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQRCode } from "next-qrcode";

const data = [
  { name: "Mon", visits: 4 },
  { name: "Tue", visits: 3 },
  { name: "Wed", visits: 5 },
  { name: "Thu", visits: 2 },
  { name: "Fri", visits: 3 },
  { name: "Sat", visits: 6 },
  { name: "Sun", visits: 4 },
];

export default function Dashboard() {
  const { SVG } = useQRCode();
  const text = "fitnessnetworking-member-123456";

  return (
    <div className="font-outfit h-full w-full p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <IoNotificationsOutline
            size={24}
            className="text-gray-600 cursor-pointer"
          />
          <User
            name="John Doe"
            description="@fitness-enthusiast"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Membership QR</h2>
            <IoFitnessOutline size={24} className="text-primary" />
          </div>
          <div className="flex justify-center">
            <SVG
              text={text}
              options={{
                margin: 2,
                width: 200,
                color: {
                  dark: "#000000",
                  light: "#ffffff",
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Credit Balance</h2>
            <IoWalletOutline size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">500 Credits</p>
          <Progress size="sm" value={70} color="primary" className="max-w-md" />
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total Spent</h2>
            <IoTrendingUpOutline size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">$1,250</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Weekly Gym Visits</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
