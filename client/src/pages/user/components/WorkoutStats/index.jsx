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

const transportationData = [
  {
    id: "japan",
    color: "hsl(148, 70%, 50%)",
    data: [
      { x: "plane", y: 206 },
      { x: "helicopter", y: 178 },
      { x: "boat", y: 228 },
      { x: "train", y: 57 },
      { x: "subway", y: 13 },
      { x: "bus", y: 294 },
      { x: "car", y: 249 },
      { x: "moto", y: 289 },
      { x: "bicycle", y: 249 },
      { x: "horse", y: 162 },
      { x: "skateboard", y: 279 },
      { x: "others", y: 61 },
    ],
  },
  {
    id: "france",
    color: "hsl(88, 70%, 50%)",
    data: [
      { x: "plane", y: 129 },
      { x: "helicopter", y: 285 },
      { x: "boat", y: 37 },
      { x: "train", y: 19 },
      { x: "subway", y: 295 },
      { x: "bus", y: 114 },
      { x: "car", y: 182 },
      { x: "moto", y: 119 },
      { x: "bicycle", y: 9 },
      { x: "horse", y: 112 },
      { x: "skateboard", y: 46 },
      { x: "others", y: 113 },
    ],
  },
];

const theme = {
  axis: {
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
      text: {
        fontSize: 12,
        fill: "#333333",
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: "#333333",
      },
    },
  },
  grid: {
    line: {
      stroke: "#dddddd",
      strokeWidth: 1,
    },
  },
};

const LineChart = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveLine
        data={transportationData}
        theme={theme}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enablePoints={true}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableGridX={false}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
