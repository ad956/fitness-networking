import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { LuCalendar, LuCreditCard, LuDumbbell } from "react-icons/lu";

export const TransactionCard = ({ transaction }) => {
  const statusColors = {
    completed: "success",
    pending: "warning",
    failed: "danger",
  };

  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg">
              <LuCreditCard className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {transaction.planName}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <LuCalendar size={14} />
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Chip
            color={statusColors[transaction.status]}
            variant="flat"
            size="sm"
          >
            {transaction.status}
          </Chip>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <LuDumbbell size={16} />
            <span>{transaction.creditPoints} credits</span>
          </div>
          <p className="font-semibold text-lg">
            ₹{transaction.amount.toFixed(2)}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
