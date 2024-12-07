import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ResponsiveLine } from "@nivo/line";
import { LuClock, LuFlame, LuTrophy } from "react-icons/lu";

const workoutData = [
  {
    id: "duration",
    color: "#3b82f6",
    data: [
      { x: "Mon", y: 45 },
      { x: "Tue", y: 60 },
      { x: "Wed", y: 30 },
      { x: "Thu", y: 75 },
      { x: "Fri", y: 45 },
      { x: "Sat", y: 90 },
      { x: "Sun", y: 0 },
    ],
  },
  {
    id: "calories",
    color: "#ef4444",
    data: [
      { x: "Mon", y: 320 },
      { x: "Tue", y: 450 },
      { x: "Wed", y: 280 },
      { x: "Thu", y: 520 },
      { x: "Fri", y: 380 },
      { x: "Sat", y: 650 },
      { x: "Sun", y: 0 },
    ],
  },
];

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
          <div className="h-[300px]">
            <ResponsiveLine
              data={workoutData}
              margin={{ top: 20, right: 60, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
              }}
              curve="monotoneX"
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
              pointSize={8}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              enableArea={true}
              areaOpacity={0.1}
              useMesh={true}
              legends={[
                {
                  anchor: "top-right",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: -20,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolSize: 12,
                  symbolShape: "circle",
                },
              ]}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fontSize: 12,
                      fill: "#6b7280",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "#e5e7eb",
                    strokeWidth: 1,
                  },
                },
                legends: {
                  text: {
                    fontSize: 12,
                    fill: "#4b5563",
                  },
                },
              }}
            />
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
