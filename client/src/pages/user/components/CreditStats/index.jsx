import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { TrendingUp, TrendingDown, CreditCard } from "react-icons/lu";

export function CreditStats({ purchased, spent, remaining }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-green-500 to-green-600">
        <CardBody className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Purchased Credits</p>
              <h3 className="text-2xl font-bold">{purchased}</h3>
            </div>
            <CreditCard className="w-8 h-8 opacity-80" />
          </div>
        </CardBody>
      </Card>

      <Card className="bg-gradient-to-br from-red-500 to-red-600">
        <CardBody className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Spent Credits</p>
              <h3 className="text-2xl font-bold">{spent}</h3>
            </div>
            <TrendingDown className="w-8 h-8 opacity-80" />
          </div>
        </CardBody>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
        <CardBody className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Remaining Credits</p>
              <h3 className="text-2xl font-bold">{remaining}</h3>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
