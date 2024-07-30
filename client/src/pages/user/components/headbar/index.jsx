import React from "react";
import { FaCoins, FaUser } from "react-icons/fa";
import { Image } from "@nextui-org/react";

// export default function Headbar({ userData }) {
export default function Headbar({ userData }) {
  return (
    <header className="bg-white shadow-md text-gray-800 py-3 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/images/fitconnect-logo.png"
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
            <div className="text-right">
              <p className="font-semibold">{userData.name}</p>
              <button className="text-xs text-blue-500 hover:text-blue-600 transition">
                View Profile
              </button>
            </div>
            <div className="bg-gray-200 rounded-full p-2">
              <FaUser className="text-gray-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
