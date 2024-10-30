import { Layout, PageNotFound } from "@components";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Membership,
  Transactions,
  Profile,
  Headbar,
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
        <Headbar userData={userData} />
        <section className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/qrcode" element={<p>Profile</p>} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </section>
      </div>
    </Layout>
  );
}
