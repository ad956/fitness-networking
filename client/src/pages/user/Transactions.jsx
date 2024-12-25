import React from "react";
import { TransactionsList } from "./components";

export default function Transactions() {
  const mockTransactions = [
    {
      id: "1",
      date: "2024-03-10",
      planName: "300 Credits Pack",
      creditPoints: 300,
      amount: 1500,
      status: "completed",
    },
    {
      id: "2",
      date: "2024-03-05",
      planName: "900 Credits Pack",
      creditPoints: 900,
      amount: 3000,
      status: "failed",
    },
    {
      id: "3",
      date: "2024-03-01",
      planName: "1800 Credits Pack",
      creditPoints: 1800,
      amount: 5000,
      status: "completed",
    },
    {
      id: "4",
      date: "2024-03-10",
      planName: "300 Credits Pack",
      creditPoints: 300,
      amount: 1500,
      status: "completed",
    },
    {
      id: "5",
      date: "2024-03-05",
      planName: "900 Credits Pack",
      creditPoints: 900,
      amount: 3000,
      status: "completed",
    },
    {
      id: "6",
      date: "2024-03-01",
      planName: "1800 Credits Pack",
      creditPoints: 1800,
      amount: 5000,
      status: "completed",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Transaction History
        </h1>
        <p className="text-gray-600">
          View all your membership purchases and credit points
        </p>
      </div>
      <TransactionsList transactions={mockTransactions} />
    </div>
  );
}
