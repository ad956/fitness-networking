import React from "react";
import { motion } from "framer-motion";
import { TransactionCard } from "./TransactionCard";

export const TransactionsList = ({ transactions }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="space-y-4"
    >
      {transactions.map((transaction) => (
        <motion.div key={transaction.id} variants={item}>
          <TransactionCard transaction={transaction} />
        </motion.div>
      ))}
    </motion.div>
  );
};
