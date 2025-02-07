import React from "react";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  LuUsers,
  LuBuilding2,
  LuDollarSign,
  LuTrendingUp,
  LuActivity,
  LuDumbbell,
} from "react-icons/lu";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

const revenueData = [
  {
    id: "revenue",
    color: "hsl(240, 70%, 50%)",
    data: [
      { x: "Jan", y: 4000 },
      { x: "Feb", y: 3000 },
      { x: "Mar", y: 2000 },
      { x: "Apr", y: 2780 },
      { x: "May", y: 1890 },
      { x: "Jun", y: 2390 },
    ],
  },
];

const membershipData = [
  { id: "Basic", value: 45, color: "hsl(207, 70%, 50%)" },
  { id: "Premium", value: 30, color: "hsl(280, 70%, 50%)" },
  { id: "Elite", value: 25, color: "hsl(120, 70%, 50%)" },
];

const gymLuActivityData = [
  { month: "Mon", morning: 45, evening: 55 },
  { month: "Tue", morning: 50, evening: 60 },
  { month: "Wed", morning: 65, evening: 70 },
  { month: "Thu", morning: 55, evening: 65 },
  { month: "Fri", morning: 40, evening: 75 },
  { month: "Sat", morning: 70, evening: 45 },
  { month: "Sun", morning: 35, evening: 30 },
];

const recentMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    plan: "Premium",
    joinDate: "2024-03-01",
    status: "active",
  },
  {
    id: 2,
    name: "Mike Chen",
    plan: "Elite",
    joinDate: "2024-02-28",
    status: "active",
  },
  {
    id: 3,
    name: "Emma Davis",
    plan: "Basic",
    joinDate: "2024-02-27",
    status: "pending",
  },
  {
    id: 4,
    name: "James Wilson",
    plan: "Premium",
    joinDate: "2024-02-26",
    status: "active",
  },
];

const statsCards = [
  {
    title: "Total Members",
    value: "2,543",
    icon: LuUsers,
    color: "text-blue-500",
  },
  {
    title: "Gym Owners",
    value: "126",
    icon: LuBuilding2,
    color: "text-green-500",
  },
  {
    title: "Revenue",
    value: "$45,231",
    icon: LuDollarSign,
    color: "text-purple-500",
  },
  {
    title: "Growth",
    value: "+12.5%",
    icon: LuTrendingUp,
    color: "text-orange-500",
  },
  {
    title: "Active Sessions",
    value: "342",
    icon: LuActivity,
    color: "text-pink-500",
  },
  {
    title: "Equipment Usage",
    value: "78%",
    icon: LuDumbbell,
    color: "text-yellow-500",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none">
              <CardBody className="flex flex-row items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-default-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="border-none">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
            <div className="h-[300px]">
              <ResponsiveLine
                data={revenueData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto" }}
                curve="natural"
                axisBottom={{ legend: "Month" }}
                axisLeft={{ legend: "Revenue ($)" }}
                enablePoints={true}
                enableArea={true}
                areaOpacity={0.15}
                useMesh={true}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="border-none">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">
              Membership Distribution
            </h2>
            <div className="h-[300px]">
              <ResponsivePie
                data={membershipData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLabelsSkipAngle={10}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    symbolSize: 18,
                    symbolShape: "circle",
                  },
                ]}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="border-none">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">
              Gym LuActivity by Time
            </h2>
            <div className="h-[300px]">
              <ResponsiveBar
                data={gymLuActivityData}
                keys={["morning", "evening"]}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "nivo" }}
                axisBottom={{ legend: "Day of Week" }}
                axisLeft={{ legend: "Number of Members" }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    translateX: 120,
                    itemWidth: 100,
                    itemHeight: 20,
                  },
                ]}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="border-none">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Recent Members</h2>
            <Table aria-label="Recent members table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>PLAN</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {recentMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.plan}</TableCell>
                    <TableCell>
                      <Chip
                        color={
                          member.status === "active" ? "success" : "warning"
                        }
                        variant="flat"
                      >
                        {member.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
