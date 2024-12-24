import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import { LuDownload, LuQrCode, LuShare2, LuTrophy } from "react-icons/lu";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function WorkoutStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <AnimatedQRCode />
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
