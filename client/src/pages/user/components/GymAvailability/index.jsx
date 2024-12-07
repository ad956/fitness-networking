import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { LuUsers } from "react-icons/lu";

export function GymAvailability({ currentUsers, maxCapacity }) {
  const availableSpots = maxCapacity - currentUsers;
  const occupancyPercentage = (currentUsers / maxCapacity) * 100;

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <LuUsers className="w-6 h-6" />
        <div className="flex flex-col">
          <p className="text-md">Current Gym Occupancy</p>
          <p className="text-small text-default-500">
            {availableSpots} spots available
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <Progress
          size="md"
          radius="sm"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-blue-500 to-blue-600",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          value={occupancyPercentage}
          showValueLabel={true}
          label="Current occupancy"
        />
        <div className="mt-4 text-center">
          <p className="text-default-500">
            {currentUsers} / {maxCapacity} people
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
