import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Tooltip,
} from "@nextui-org/react";
import {
  LuDownload,
  LuMapPin,
  LuClock,
  LuCalendarCheck,
  LuActivity,
  LuQrCode,
  LuShare2,
  LuDumbbell,
} from "react-icons/lu";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function WorkoutStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <GymMembership />
      <AnimatedQRCode />
    </div>
  );
}

const GymMembership = () => {
  const gymDetails = {
    name: "FitLife Pro Gym",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    location: "123 Fitness Avenue, Downtown",
    memberSince: "January 2024",
    workoutStreak: 45,
    operatingHours: "24/7",
    amenities: ["Cardio Zone", "Personal Training"],
  };

  return (
    <Card className="p-2">
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-purple-50 rounded-lg">
          <LuDumbbell className="w-6 h-6 text-purple-500" />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-semibold">Current Gym</p>
          <p className="text-small text-default-500">Your current gym status</p>
        </div>
      </CardHeader>

      <CardBody className="overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-xl">
              <Avatar
                src={gymDetails.image}
                className="w-16 h-16"
                classNames={{
                  base: "ring-2 ring-purple-500/30",
                  img: "object-cover",
                }}
              />
              <div>
                <h3 className="text-lg font-semibold">{gymDetails.name}</h3>
                <p className="text-small text-default-500">Active Membership</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <LuMapPin className="w-5 h-5 text-purple-500" />
              <span className="text-sm">{gymDetails.location}</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <LuClock className="w-5 h-5 text-purple-500" />
              <span className="text-sm">{gymDetails.operatingHours}</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <LuCalendarCheck className="w-5 h-5 text-purple-500" />
              <span className="text-sm">{gymDetails.memberSince}</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <LuActivity className="w-5 h-5 text-green-500" />
              <span className="text-sm">
                <span className="font-semibold">
                  {gymDetails.workoutStreak}
                </span>{" "}
                days
              </span>
            </motion.div>
          </div>

          <div className="w-full">
            <h4 className="text-md font-semibold mb-3">Available Amenities</h4>
            <div className="grid grid-cols-2 gap-3">
              {gymDetails.amenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-sm">{amenity}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

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
