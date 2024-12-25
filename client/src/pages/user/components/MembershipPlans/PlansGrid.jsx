import React from "react";
import { motion } from "framer-motion";
import { PlanCard } from "./PlanCard";

export const PlansGrid = ({ plans }) => {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
    >
      {plans.map((plan, index) => (
        <motion.div key={plan.creditPoints} variants={item}>
          <PlanCard
            plan={plan}
            isPopular={index === 2} // Making the third plan popular
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
