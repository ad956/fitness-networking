import React from "react";
import { CreditStats, GymMap, WorkoutStats } from "./components/";

const Dashboard = () => {
  return (
    <div className="p-8">
      <CreditStats purchased={100} spent={45} remaining={55} />
      <WorkoutStats />
      <GymMap />
    </div>
  );
};

export default Dashboard;
