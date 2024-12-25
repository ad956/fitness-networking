import React from "react";
import { LuCheck } from "react-icons/lu";

export const PlanFeatures = ({ features }) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <LuCheck size={16} className="text-primary-500" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  );
};
