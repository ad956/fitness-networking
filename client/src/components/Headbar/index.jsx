import React from "react";
import { Avatar } from "@nextui-org/react";
import { LuBell } from "react-icons/lu";
import { motion } from "framer-motion";

export default function Headbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/50 backdrop-blur-sm shadow-sm"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold">Welcome back, John!</h1>
        <p className="text-gray-500">
          Track your fitness journey and gym activities
        </p>
      </motion.div>

      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setIsNotificationsOpen(true)}
        >
          <LuBell className="w-5 h-5 text-gray-700" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          />
        </motion.button>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
