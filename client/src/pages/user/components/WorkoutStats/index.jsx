import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ResponsiveLine } from "@nivo/line";
import { LuClock, LuFlame, LuTrophy } from "react-icons/lu";

const data = [
  {
    id: "japan",
    color: "hsl(148, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 206,
      },
      {
        x: "helicopter",
        y: 178,
      },
      {
        x: "boat",
        y: 228,
      },
      {
        x: "train",
        y: 57,
      },
      {
        x: "subway",
        y: 13,
      },
      {
        x: "bus",
        y: 294,
      },
      {
        x: "car",
        y: 249,
      },
      {
        x: "moto",
        y: 289,
      },
      {
        x: "bicycle",
        y: 249,
      },
      {
        x: "horse",
        y: 162,
      },
      {
        x: "skateboard",
        y: 279,
      },
      {
        x: "others",
        y: 61,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(88, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 129,
      },
      {
        x: "helicopter",
        y: 285,
      },
      {
        x: "boat",
        y: 37,
      },
      {
        x: "train",
        y: 19,
      },
      {
        x: "subway",
        y: 295,
      },
      {
        x: "bus",
        y: 114,
      },
      {
        x: "car",
        y: 182,
      },
      {
        x: "moto",
        y: 119,
      },
      {
        x: "bicycle",
        y: 9,
      },
      {
        x: "horse",
        y: 112,
      },
      {
        x: "skateboard",
        y: 46,
      },
      {
        x: "others",
        y: 113,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(304, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 271,
      },
      {
        x: "helicopter",
        y: 292,
      },
      {
        x: "boat",
        y: 250,
      },
      {
        x: "train",
        y: 181,
      },
      {
        x: "subway",
        y: 137,
      },
      {
        x: "bus",
        y: 18,
      },
      {
        x: "car",
        y: 225,
      },
      {
        x: "moto",
        y: 21,
      },
      {
        x: "bicycle",
        y: 280,
      },
      {
        x: "horse",
        y: 199,
      },
      {
        x: "skateboard",
        y: 81,
      },
      {
        x: "others",
        y: 283,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(79, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 296,
      },
      {
        x: "helicopter",
        y: 265,
      },
      {
        x: "boat",
        y: 258,
      },
      {
        x: "train",
        y: 104,
      },
      {
        x: "subway",
        y: 23,
      },
      {
        x: "bus",
        y: 52,
      },
      {
        x: "car",
        y: 133,
      },
      {
        x: "moto",
        y: 190,
      },
      {
        x: "bicycle",
        y: 107,
      },
      {
        x: "horse",
        y: 218,
      },
      {
        x: "skateboard",
        y: 170,
      },
      {
        x: "others",
        y: 15,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(114, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 280,
      },
      {
        x: "helicopter",
        y: 35,
      },
      {
        x: "boat",
        y: 164,
      },
      {
        x: "train",
        y: 199,
      },
      {
        x: "subway",
        y: 7,
      },
      {
        x: "bus",
        y: 212,
      },
      {
        x: "car",
        y: 22,
      },
      {
        x: "moto",
        y: 113,
      },
      {
        x: "bicycle",
        y: 178,
      },
      {
        x: "horse",
        y: 46,
      },
      {
        x: "skateboard",
        y: 241,
      },
      {
        x: "others",
        y: 54,
      },
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
              data={data}
              theme={{
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
              }}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
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
              // {...otherProps}
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
