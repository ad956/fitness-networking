import { Select, SelectItem } from "@nextui-org/react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const creditsSpentData = [
  {
    id: "user A",
    data: [
      { x: "Sunday", y: 95 },
      { x: "Monday", y: 40 },
      { x: "Tuesday", y: 70 },
      { x: "Wednesday", y: 90 },
      { x: "Thursday", y: 60 },
      { x: "Friday", y: 50 },
      { x: "Saturday", y: 80 },
    ],
  },
];

const years = [
  {
    label: "2020",
    year: 2020,
  },
  {
    label: "2021",
    year: 2021,
  },
  {
    label: "2022",
    year: 2022,
  },
  {
    label: "2023",
    year: 2023,
  },
  {
    label: "2024",
    year: 2024,
  },
];

const progressData = years.map((year) => {
  const randomValue = Math.floor(Math.random() * 100);
  return { year: year.year, value: randomValue };
});

const CreditSpentLine = () => {
  // const updatedCreditData = creditsSpentData.map((user) => ({
  //   ...user,
  //   data: user.data.map((item, index) => ({
  //     ...item,
  //     y: progressData[index] !== undefined ? progressData[index] : item.y,
  //   })),
  // }));

  return (
    <div className="h-full w-full p-5">
      <div className="flex flex-row justify-between items-center">
        <p className="text-md font-semibold">Credits Used</p>
      </div>
      <ResponsiveLine
        fill={[{ match: "*", id: "gradient" }]}
        defs={[]}
        enableCrosshair={false}
        crosshairType="x"
        role=""
        sliceTooltip={({ slice }) => <></>}
        data={creditsSpentData}
        // data={updatedCreditData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 100 }}
        curve="basis"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        colors={["#0070f0"]}
        lineWidth={0}
        pointSize={8}
        pointColor={{ theme: "grid.line.stroke" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        axisLeft={{
          tickValues: [0, 25, 50, 75, 100],
          legendOffset: -40,
          legendPosition: "middle",
        }}
        axisBottom={{
          legendOffset: 50,
        }}
        useMesh={true}
        debugSlices={false}
        enableSlices={false}
        debugMesh={false}
        isInteractive={true}
        legends={[]}
        areaBaselineValue={0}
        areaBlendMode="normal"
        areaOpacity={0.2}
        enableArea={true}
        pointLabel="y"
        enablePointLabel={false}
        enablePoints={false}
        layers={[
          "grid",
          "markers",
          "axes",
          "areas",
          "crosshair",
          "lines",
          "slices",
          "points",
          "mesh",
          "legends",
        ]}
      />
    </div>
  );
};

const WeeklyData = [
  {
    id: "Credits",
    data: [{ x: "Credits", y: 70 }],
  },
  {
    id: "Transactions",
    data: [{ x: "Transactions", y: 60 }],
  },
];

const WeeklyProgress = () => {
  // const updatedWeeklyData = WeeklyData.map((day, index) => ({
  //   ...day,
  //   data: [{ x: day.id, y: progressData[index] }],
  // }));

  return (
    <ResponsiveRadialBar
      data={WeeklyData}
      valueFormat=">-.2f"
      // startAngle={-360}
      // endAngle={-360}
      colors={[
        "#fd893c",
        "#f5547e",
        "#ffa046",
        "#fdde50",
        "#0babcf",
        "#4e5bdb",
        "#9b49ea",
      ]}
      innerRadius={0}
      padding={0.7}
      cornerRadius={2}
      margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
      radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
    />
  );
};

export { WeeklyProgress, CreditSpentLine };
