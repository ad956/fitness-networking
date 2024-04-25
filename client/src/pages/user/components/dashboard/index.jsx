import React from "react";
import { Card, User } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Dashboard() {
  return (
    <div className="font-outfit h-full w-full grid grid-rows-7 grid-cols-6 gap3 border2 border-rose-600">
      <div className="row-span-1 col-span-6 flex justify-between items-center px-10">
        <h1 className="text-xl font-medium tracking-wide">Dashboard</h1>

        {/* header */}
        <div className="flex flex-row gap-5 items-center">
          <IoNotificationsOutline size={20} />
          <User
            name="Jane Doe"
            description="@gym-member"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            classNames={{
              name: "font-medium",
              description: "font-medium",
            }}
          />
        </div>
      </div>
    </div>
  );
}
