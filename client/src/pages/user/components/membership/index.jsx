import React from "react";
import { Card, Button, Progress } from "@nextui-org/react";
import {
  IoFitnessOutline,
  IoCalendarOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

export default function Membership() {
  return (
    <div className="font-outfit h-full w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold">Membership</h1>

      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Plan</h2>
          <IoFitnessOutline size={24} className="text-primary" />
        </div>
        <p className="text-3xl font-bold">Premium Fitness Network</p>
        <p className="text-gray-600">Valid until: December 31, 2024</p>
        <Progress size="sm" value={70} color="primary" className="max-w-md" />
        <p className="text-sm text-gray-500">70% of membership period used</p>
        <Button color="primary">Renew Membership</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Gym Visits This Month</h2>
            <IoCalendarOutline size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">15 visits</p>
          <p className="text-sm text-gray-500">5 more than last month</p>
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Fitness Progress</h2>
            <IoTrendingUpOutline size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">+12%</p>
          <p className="text-sm text-gray-500">Overall improvement</p>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Available Gyms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["GymA", "GymB", "GymC"].map((gym) => (
            <Card key={gym} className="p-4">
              <h3 className="font-semibold">{gym}</h3>
              <p className="text-sm text-gray-500">City, State</p>
              <Button size="sm" color="primary" className="mt-2">
                Check In
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
