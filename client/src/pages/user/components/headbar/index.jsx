import React from "react";
import { FaCoins, FaUser } from "react-icons/fa";
import { Image, User } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export default function Headbar({ userData }) {
  return (
    <header className="bg-white shadow-md text-gray-800 py-3 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.pinimg.com/736x/fc/ce/92/fcce92b6dd2ebb5259426a424a6f983d.jpg"
            alt="FitConnect"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-blue-600">FitConnect</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
            <FaCoins className="text-yellow-500 mr-2" />
            <div>
              <p className="font-semibold text-blue-600">
                {userData.creditPoints} pts
              </p>
              <p className="text-xs text-gray-500">Credit Balance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User
              name={"Anand"}
              avatarProps={{
                src: "https://i.pinimg.com/736x/fc/ce/92/fcce92b6dd2ebb5259426a424a6f983d.jpg",
              }}
              className=""
              description={
                <NavLink
                  href={`/settings`}
                  className="text-xs text-primary"
                >{`@${"ad956"}`}</NavLink>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
