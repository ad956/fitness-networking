import React from "react";
import {
  AnimatedQRCode,
  CreditStats,
  GymMap,
  GymMembership,
} from "./components/";

const Dashboard = () => {
  return (
    <div className="p-8">
      <CreditStats purchased={100} spent={45} remaining={55} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GymMembership />
        <AnimatedQRCode />
      </div>
      <GymMap />
    </div>
  );
};

export default Dashboard;
