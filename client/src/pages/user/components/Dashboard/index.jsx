import React from "react";
import {
  FaCoins,
  FaDumbbell,
  FaMapMarkerAlt,
  FaChartLine,
  FaCalendarAlt,
  FaBullseye,
  FaLightbulb,
} from "react-icons/fa";

const Dashboard = () => {
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

  const dailyTip =
    "Try incorporating a 10-minute stretching routine into your morning to improve flexibility and reduce muscle tension.";

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Welcome back, {userData.name}!
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Credit Points</h2>
            <FaCoins className="text-3xl text-yellow-300" />
          </div>
          <p className="text-5xl font-bold mt-4">{userData.creditPoints}</p>
          <button className="mt-6 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
            Top Up
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Monthly Activity
            </h2>
            <FaChartLine className="text-3xl text-green-500" />
          </div>
          <p className="text-4xl font-bold text-gray-800">
            {userData.stats.monthlyVisits} visits
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Points used: {userData.stats.pointsUsed}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Favorite Cities
            </h2>
            <FaMapMarkerAlt className="text-3xl text-red-500" />
          </div>
          <ul className="mt-2">
            {userData.stats.favoriteCities.map((city, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Upcoming Bookings
            </h2>
            <FaCalendarAlt className="text-3xl text-blue-500" />
          </div>
          {userData.upcomingBookings.map((booking, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="font-semibold text-gray-800">{booking.gym}</p>
              <p className="text-sm text-gray-600">
                {booking.date} at {booking.time}
              </p>
            </div>
          ))}
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Book a Session
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Fitness Goals
            </h2>
            <FaBullseye className="text-3xl text-green-500" />
          </div>
          {userData.fitnessGoals.map((goal, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-700">{goal.goal}</span>
                <span className="text-sm text-gray-500">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Update Goals
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-3xl text-yellow-300 mr-3" />
          <h2 className="text-2xl font-semibold">Daily Fitness Tip</h2>
        </div>
        <p className="text-lg">{dailyTip}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Gym Visits
          </h2>
          <FaDumbbell className="text-3xl text-gray-600" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {userData.recentVisits.map((visit, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-lg text-gray-800">{visit.gym}</p>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaMapMarkerAlt className="mr-1" />
                <span>{visit.city}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaCalendarAlt className="mr-1" />
                <span>{visit.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
