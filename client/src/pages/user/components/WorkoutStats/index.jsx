import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LuClock, LuFlame, LuTrophy } from "react-icons/lu";

const workoutData = [
  { day: "Mon", duration: 45, calories: 320 },
  { day: "Tue", duration: 60, calories: 450 },
  { day: "Wed", duration: 30, calories: 280 },
  { day: "Thu", duration: 75, calories: 520 },
  { day: "Fri", duration: 45, calories: 380 },
  { day: "Sat", duration: 90, calories: 650 },
  { day: "Sun", duration: 0, calories: 0 },
];

export function WorkoutStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <LuTrophy className="w-6 h-6 text-yellow-500" />
          <div className="flex flex-col">
            <p className="text-md">Weekly Progress</p>
            <p className="text-small text-default-500">
              Last 7 days performance
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={workoutData}>
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="duration"
                  stroke="#3b82f6"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="calories"
                  stroke="#ef4444"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <h4 className="text-lg font-bold">Today's Summary</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <LuClock className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-2xl font-bold text-blue-600">75</span>
              <span className="text-sm text-gray-600">Minutes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
              <LuFlame className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-2xl font-bold text-red-600">520</span>
              <span className="text-sm text-gray-600">Calories</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <LuTrophy className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-2xl font-bold text-green-600">4/5</span>
              <span className="text-sm text-gray-600">Goals Met</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
