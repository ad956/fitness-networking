import React from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { LuCalendar, LuClock, LuUsers } from "react-icons/lu";

const classes = [
  {
    name: "Yoga Flow",
    instructor: "Sarah Johnson",
    time: "10:00 AM",
    duration: "60 min",
    spots: 3,
  },
  {
    name: "HIIT Training",
    instructor: "Mike Thompson",
    time: "2:30 PM",
    duration: "45 min",
    spots: 5,
  },
  {
    name: "Strength & Conditioning",
    instructor: "Alex Rivera",
    time: "4:00 PM",
    duration: "50 min",
    spots: 2,
  },
];

export function UpcomingClasses() {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex gap-3">
          <LuCalendar className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-md">Upcoming Classes</p>
            <p className="text-small text-default-500">Today's schedule</p>
          </div>
        </div>
        <Button color="primary" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold">{classItem.name}</h4>
                <p className="text-sm text-gray-500">{classItem.instructor}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <LuClock className="w-4 h-4" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <LuUsers className="w-4 h-4" />
                    <span>{classItem.spots} spots left</span>
                  </div>
                </div>
              </div>
              <Button color="primary" variant="flat" size="sm">
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
