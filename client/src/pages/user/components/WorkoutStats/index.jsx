import React from "react";
import { Card, CardBody, CardHeader, cn } from "@nextui-org/react";
import {
  LuClock,
  LuDumbbell,
  LuFlame,
  LuHeart,
  LuTrophy,
} from "react-icons/lu";
import { ResponsiveLine } from "@nivo/line";

export default function WorkoutStats() {
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
          <LineChart />
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <h4 className="text-lg font-bold">Today's Summary</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={LuClock}
              value="75 min"
              label="Workout Time"
              subtext="15 min more than yesterday"
              color="text-blue-600"
              bgColor="bg-blue-50"
              trend={{ value: 20, isPositive: true }}
            />
            <StatCard
              icon={LuFlame}
              value="520"
              label="Calories Burned"
              subtext="Daily goal: 800 cal"
              color="text-red-600"
              bgColor="bg-red-50"
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              icon={LuHeart}
              value="142 bpm"
              label="Avg Heart Rate"
              subtext="Peak: 165 bpm"
              color="text-rose-600"
              bgColor="bg-rose-50"
            />
            <StatCard
              icon={LuDumbbell}
              value="4/5"
              label="Sets Completed"
              subtext="Upper body focus"
              color="text-violet-600"
              bgColor="bg-violet-50"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  subtext,
  color,
  bgColor,
  trend,
}) {
  return (
    <div
      className={cn(
        "flex flex-col p-4 rounded-lg transition-all duration-200 hover:shadow-md",
        bgColor
      )}
    >
      <div className="flex items-start justify-between">
        <Icon className={cn("h-8 w-8", color)} />
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.isPositive
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            )}
          >
            {trend.isPositive ? "+" : "-"}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <span className={cn("text-2xl font-bold", color)}>{value}</span>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          {label}
        </p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
}
