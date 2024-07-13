import React from "react";
import { Card, User, Progress, Input, Button } from "@nextui-org/react";
import {
  IoNotificationsOutline,
  IoFitnessOutline,
  IoWalletOutline,
  IoTrendingUpOutline,
  IoSearchOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { useQRCode } from "next-qrcode";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const weeklyData = [
  { day: "Mon", visits: 4 },
  { day: "Tue", visits: 3 },
  { day: "Wed", visits: 5 },
  { day: "Thu", visits: 2 },
  { day: "Fri", visits: 3 },
  { day: "Sat", visits: 6 },
  { day: "Sun", visits: 4 },
];

const creditSpendData = [
  { id: "Week", value: 100 },
  { id: "Month", value: 450 },
  { id: "Year", value: 5000 },
];

const creditHistoryData = [
  { x: "Jan", y: 200 },
  { x: "Feb", y: 300 },
  { x: "Mar", y: 400 },
  { x: "Apr", y: 350 },
  { x: "May", y: 500 },
  { x: "Jun", y: 450 },
  { x: "Jul", y: 400 },
];

const gymLocations = [
  { name: "Gym A", lat: 40.7128, lng: -74.006, capacity: 3 },
  { name: "Gym B", lat: 40.7282, lng: -73.9942, capacity: 5 },
  { name: "Gym C", lat: 40.7484, lng: -73.9857, capacity: 2 },
];

export default function Dashboard() {
  const { SVG } = useQRCode();
  const text = "fitnessnetworking-member-123456";

  return (
    <div className="font-outfit h-full w-full p-6 space-y-6 bg-gray-100">
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <IoNotificationsOutline
            size={24}
            className="text-gray-600 cursor-pointer hover:text-primary transition-colors"
          />
          <User
            name="John Doe"
            description="@fitness-enthusiast"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Membership QR</h2>
            <IoFitnessOutline size={24} className="text-primary" />
          </div>
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <SVG
              text={text}
              options={{
                margin: 2,
                width: 200,
                color: {
                  dark: "#000000",
                  light: "#ffffff",
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-6 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Credit Balance</h2>
            <IoWalletOutline size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">500 Credits</p>
          <Progress size="sm" value={70} color="primary" className="max-w-md" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Recent Purchase: +100</span>
            <span>Spent this month: 150</span>
          </div>
        </Card>

        <Card className="p-6 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total Spent</h2>
            <IoTrendingUpOutline size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">$1,250</p>
          <p className="text-sm text-gray-600">Last 30 days</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Gym Visits</h2>
          <div className="h-80">
            <ResponsiveBar
              data={weeklyData}
              keys={["visits"]}
              indexBy="day"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Day",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Visits",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        </Card>

        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Credit Spend Overview</h2>
          <div className="h-80">
            <ResponsivePie
              data={creditSpendData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "nivo" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Credit History</h2>
        <div className="h-80">
          <ResponsiveLine
            data={[{ id: "credits", data: creditHistoryData }]}
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
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Month",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Credits",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            colors={{ scheme: "nivo" }}
          />
        </div>
      </Card>

      <Card className="p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Gym Search</h2>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Search for gyms"
            startContent={<IoSearchOutline className="text-gray-400" />}
          />
          <Button color="primary">Search</Button>
        </div>
        <div className="h-96">
          <MapContainer
            center={[40.7128, -74.006]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {gymLocations.map((gym, index) => (
              <Marker key={index} position={[gym.lat, gym.lng]}>
                <Popup>
                  <div className="font-semibold">{gym.name}</div>
                  <div className="flex items-center mt-2">
                    <IoPersonOutline className="mr-1" />
                    <span>{gym.capacity} spots available</span>
                  </div>
                  <Button size="sm" color="primary" className="mt-2">
                    Check In
                  </Button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Card>
    </div>
  );
}
