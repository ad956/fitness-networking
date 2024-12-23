import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { Input, Button, Card } from "@nextui-org/react";
import {
  LuDownload,
  LuQrCode,
  LuScan,
  LuShare2,
  LuUsers,
} from "react-icons/lu";

export default function QRCodePage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* <BackgroundPattern /> */}

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Personal QR Code
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your contact information instantly with a simple scan
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex justify-center">
            <QRCode value={"email"} />
          </div>

          <StepsGuide />
        </div>
      </div>
    </div>
  );
}

const QRCode = ({ value, size = 300 }) => {
  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "my-qrcode.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="relative">
        {/* Animated gradient background */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative bg-white p-8 rounded-xl shadow-lg">
          <QRCodeCanvas value={value} size={size} level="H" includeMargin />

          <div className="flex gap-4 mt-6 justify-center">
            <Button
              color="primary"
              endContent={<LuDownload />}
              onClick={downloadQRCode}
              className="font-semibold"
              size="lg"
            >
              Download QR Code
            </Button>
            <Button
              variant="bordered"
              endContent={<LuShare2 />}
              className="font-semibold"
              size="lg"
            >
              Share QR Code
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const steps = [
  {
    icon: LuScan,
    title: "Scan QR Code",
    description:
      "Others can easily scan your QR code using their smartphone camera",
  },
  {
    icon: LuUsers,
    title: "Connect Instantly",
    description: "They'll be directed to your profile instantly",
  },
  {
    icon: LuDownload,
    title: "Download & Share",
    description: "Download your QR code or share it directly with others",
  },
  {
    icon: LuShare2,
    title: "Use Anywhere",
    description: "Print it, share it online, or add it to your business card",
  },
];

const StepsGuide = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8">How It Works</h2>

      {steps.map((step, index) => (
        <motion.div key={index} variants={item}>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
