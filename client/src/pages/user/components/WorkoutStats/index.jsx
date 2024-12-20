import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { LuDownload, LuQrCode, LuShare2, LuTrophy } from "react-icons/lu";
import { ResponsiveCalendar } from "@nivo/calendar";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

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
      <AnimatedQRCode />
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

const AnimatedQRCode = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    const svg = document.querySelector("#workout-qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `workout-qr.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <LuQrCode className="w-6 h-6 text-purple-500" />
        <div className="flex flex-col">
          <p className="text-md">Workout QR Code</p>
          <p className="text-small text-default-500">
            Share your fitness journey
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="perspective-1000"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                rotateX: isHovered ? 15 : 0,
                rotateY: isHovered ? -15 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
              className="transform-style-3d"
            >
              <QRCodeSVG
                id="workout-qr-code"
                value={"user@mail.com"}
                size={200}
                bgColor="white"
                fgColor="black"
                level="H"
                className="shadow-lg rounded-lg p-4 bg-white"
              />
            </motion.div>
          </motion.div>

          <div className="flex gap-2 mt-4">
            <Tooltip content="Download QR Code">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={handleDownload}
              >
                <LuDownload className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Share">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "My Workout QR Code",
                      url: "https://github.com/ad956",
                    });
                  }
                }}
              >
                <LuShare2 className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>

          <p className="text-small text-default-500 text-center mt-2">
            Scan this QR at the gym for entry.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
