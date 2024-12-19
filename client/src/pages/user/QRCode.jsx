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

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Animated background patterns */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIwIiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==')]" />
      </motion.div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-8">
              <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
                <LuQrCode size={48} className="text-purple-600 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                QR Code Generator
              </h1>
              <p className="text-gray-600">
                Generate and download custom QR codes instantly
              </p>
            </div>

            <div className="space-y-6">
              <Input
                type="text"
                label="Enter text or URL"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="w-full"
                endContent={<RefreshCw className="text-gray-400" size={20} />}
              />

              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  {text && (
                    <QRCodeCanvas
                      value={text}
                      size={size}
                      level="H"
                      includeMargin
                      imageSettings={{
                        excavate: true,
                      }}
                    />
                  )}
                </motion.div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  color="primary"
                  endContent={<LuDownload size={20} />}
                  onClick={downloadQRCode}
                  disabled={!text}
                  className="font-semibold"
                >
                  Download QR Code
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
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
