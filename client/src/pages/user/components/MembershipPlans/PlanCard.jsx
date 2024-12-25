import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@nextui-org/react";

export const PlanCard = ({ plan, isPopular }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className={`w-full ${
          isPopular ? "border-2 border-blue-500" : "border border-gray-200"
        }`}
        shadow="sm"
      >
        <CardBody className="p-6">
          {isPopular && (
            <span className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 text-xs rounded-bl-lg">
              Popular Choice
            </span>
          )}

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {plan.creditPoints} Credits Pack
            </h3>
            <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
          </div>

          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{plan.price.toFixed(2)}
            </span>
            <span className="text-gray-500 ml-2 text-sm">/package</span>
          </div>

          <Button
            className={`w-full ${
              isPopular
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
            }`}
            size="lg"
            onClick={() => alert(`Selected ${plan.creditPoints} credits plan`)}
          >
            Get Started
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  );
};
