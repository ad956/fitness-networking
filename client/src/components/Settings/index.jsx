import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBell,
  LuMoon,
  LuGlobe,
  LuVolume2,
  LuX,
  LuChevronDown,
} from "react-icons/lu";

const Settings = ({ isOpen, onClose }) => {
  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
  ];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
  };

  const Switch = ({ defaultChecked = false }) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);

    return (
      <motion.button
        onClick={() => setIsChecked(!isChecked)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
          isChecked ? "bg-indigo-600" : "bg-gray-200"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"
          animate={{ x: isChecked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    );
  };

  const Select = ({ options, defaultValue }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(defaultValue);

    return (
      <div className="relative w-48">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border rounded-lg flex items-center justify-between"
          whileTap={{ scale: 0.98 }}
        >
          <span>{options.find((opt) => opt.value === selected)?.label}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <LuChevronDown />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50"
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setSelected(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  whileHover={{ backgroundColor: "#F9FAFB" }}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md pointer-events-auto"
              variants={modalVariants}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Settings
                </h2>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LuX size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Notifications */}
                <section>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <LuBell className="text-indigo-600" size={20} />
                        </div>
                        <span className="text-gray-700">
                          Push Notifications
                        </span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <LuVolume2 className="text-indigo-600" size={20} />
                        </div>
                        <span className="text-gray-700">Sound Effects</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* Appearance */}
                <section>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Appearance
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <LuMoon className="text-indigo-600" size={20} />
                      </div>
                      <span className="text-gray-700">Dark Mode</span>
                    </div>
                    <Switch />
                  </div>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* Language */}
                <section>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Language
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <LuGlobe className="text-indigo-600" size={20} />
                    </div>
                    <Select options={languages} defaultValue="en" />
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Settings;
