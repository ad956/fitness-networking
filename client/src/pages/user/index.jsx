import { Layout, PageNotFound } from "@components";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Membership,
  Transactions,
  Profile,
  Headbar,
  CreditStats,
  GymAvailability,
  GymMap,
  UpcomingClasses,
  WorkoutStats,
} from "./components/";

export default function UserLayout() {
  const userData = {
    name: "John Doe",
    creditPoints: 500,
    recentVisits: [
      { gym: "FitLife Gym", date: "2024-07-28", city: "New York" },
      { gym: "PowerHouse", date: "2024-07-25", city: "Los Angeles" },
      { gym: "Iron Pumpers", date: "2024-07-22", city: "Chicago" },
    ],
    stats: {
      monthlyVisits: 12,
      favoriteCities: ["New York", "Los Angeles", "Chicago"],
      pointsUsed: 350,
    },
    upcomingBookings: [
      { gym: "FitLife Gym", date: "2024-07-31", time: "10:00 AM" },
      { gym: "Iron Pumpers", date: "2024-08-02", time: "2:00 PM" },
    ],
    fitnessGoals: [
      { goal: "Run 5k", progress: 60 },
      { goal: "Bench Press 200lbs", progress: 75 },
      { goal: "Attend 20 classes", progress: 40 },
    ],
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="p-8">
          <Headbar />
          <CreditStats purchased={100} spent={45} remaining={55} />
          <WorkoutStats />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GymAvailability currentUsers={15} maxCapacity={20} />
            <UpcomingClasses />
          </div>
          <GymMap />
        </div>
      </div>
    </Layout>
  );
}
