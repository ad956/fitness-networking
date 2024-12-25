import React from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { Card, Button } from "@nextui-org/react";
import { LuDownload, LuDumbbell, LuCreditCard, LuQrCode } from "react-icons/lu";

const GymQRCodePage = () => {
  const memberData = {
    id: "GYM123456",
    name: "John Doe",
    membershipType: "Premium",
    qrValue: "GYM123456-MEMBER-ACCESS",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <header className="text-center space-y-3">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
            {memberData.membershipType} Access
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Gym Access Pass</h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{memberData.name}</h2>
                <p className="text-sm text-gray-500">ID: {memberData.id}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="shadow-lg rounded-lg"
                >
                  <QRCodeCanvas
                    value={memberData.qrValue}
                    size={220}
                    level="H"
                    includeMargin
                  />
                </motion.div>
              </div>

              <Button
                color="primary"
                endContent={<LuDownload className="w-4 h-4" />}
                className="w-full"
                size="lg"
              >
                Download Pass
              </Button>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-8">How It Works</h3>
            <div className="space-y-6">
              {[
                {
                  icon: <LuQrCode className="w-6 h-6 text-blue-500" />,
                  title: "Show QR at Entry",
                  desc: "Present your QR code at the gym entrance scanner",
                },
                {
                  icon: <LuCreditCard className="w-6 h-6 text-purple-500" />,
                  title: "Credits Deducted",
                  desc: "Credits will be automatically deducted per visit",
                },
                {
                  icon: <LuDumbbell className="w-6 h-6 text-green-500" />,
                  title: "Access Granted",
                  desc: "Enter the gym and enjoy your workout session",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default GymQRCodePage;
