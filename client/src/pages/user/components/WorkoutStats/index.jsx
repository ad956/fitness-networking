import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { LuClock, LuFlame, LuTrophy } from "react-icons/lu";
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
        <CardBody>{/* <LineChart /> */}</CardBody>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <h4 className="text-lg font-bold">Today's Summary</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-4">
            <StatsCard
              icon={LuClock}
              value={75}
              label="Minutes"
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatsCard
              icon={LuFlame}
              value={520}
              label="Calories"
              color="text-red-600"
              bgColor="bg-red-50"
            />
            <StatsCard
              icon={LuTrophy}
              value="4/5"
              label="Goals Met"
              color="text-green-600"
              bgColor="bg-green-50"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const StatsCard = ({ icon: Icon, value, label, color, bgColor }) => {
  return (
    <div className={`flex flex-col items-center p-4 ${bgColor} rounded-lg`}>
      <Icon className={`w-8 h-8 ${color} mb-2`} />
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

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
