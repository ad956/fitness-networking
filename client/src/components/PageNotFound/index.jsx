import React from "react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { LuDumbbell } from "react-icons/lu";
import { fitness } from "@images";
import { useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 grid place-items-center"
          >
            <Image
              src={fitness}
              alt="Fitness Logo"
              className="w-32 h-32 mx-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold text-gray-800 mb-4"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you've wandered off your fitness path! Let's get you
              back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <FiArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-colors duration-300"
            >
              <FiHome className="w-5 h-5" />
              Home
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 p-6 border-t border-gray-100"
        >
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <LuDumbbell className="w-6 h-6" />
            <span>Keep pushing! Every setback is a setup for a comeback.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
