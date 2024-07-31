import React from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const transactions = [
  { id: 1, date: "2024-07-01", description: "Monthly Membership", amount: -50 },
  {
    id: 2,
    date: "2024-07-05",
    description: "Personal Training Session",
    amount: -75,
  },
  { id: 3, date: "2024-07-10", description: "Credit Purchase", amount: 100 },
  {
    id: 4,
    date: "2024-07-15",
    description: "Gym Visit - New York",
    amount: -10,
  },
  {
    id: 5,
    date: "2024-07-20",
    description: "Gym Visit - Los Angeles",
    amount: -10,
  },
];

export default function Transactions() {
  return (
    <div className="font-outfit h-full w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <Card className="p-6">
        <Table aria-label="Transaction history">
          <TableHeader>
            <TableColumn>DATE</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell
                  className={
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
