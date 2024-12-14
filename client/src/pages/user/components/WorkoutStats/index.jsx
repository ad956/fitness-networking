import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  cn,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  LuClock,
  LuDumbbell,
  LuFlame,
  LuHeart,
  LuTrophy,
} from "react-icons/lu";
import { ResponsiveCalendar } from "@nivo/calendar";

export default function WorkoutStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <LuTrophy className="w-6 h-6 text-yellow-500" />
          <div className="flex flex-col">
            <p className="text-md">Workout Calendar</p>
            <p className="text-small text-default-500">
              Your training consistency
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <WorkoutCalendar />
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

function WorkoutCalendar() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: currentYear - 2019 }, (_, i) =>
    (currentYear - i).toString()
  );

  const startDate = `${selectedYear}-01-01`;
  const endDate = `${selectedYear}-12-31`;

  const generateWorkoutData = () => {
    const data = [];
    const end = new Date();
    const start = new Date(end);
    start.setFullYear(start.getFullYear() - 1);

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      if (Math.random() > 0.3) {
        // 70% chance of having a workout
        data.push({
          value: Math.floor(Math.random() * 120) + 30, // Random workout duration 30-150 minutes
          day: d.toISOString().split("T")[0],
        });
      }
    }
    return data;
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-2">
        <Select
          label="Select Year"
          selectedKeys={[selectedYear.toString()]}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="w-40"
          size="sm"
          variant="bordered"
          labelPlacement="outside"
        >
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="h-[250px]">
        <ResponsiveCalendar
          data={generateWorkoutData(selectedYear)}
          from={startDate}
          to={endDate}
          emptyColor="#eeeeee"
          colors={["#a8e6cf", "#69d2e7", "#3498db", "#2980b9"]}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </div>
    </div>
  );
}
