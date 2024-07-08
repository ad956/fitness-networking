import React from "react";
import { Card, User, Input, Button } from "@nextui-org/react";

export default function Profile() {
  return (
    <div className="font-outfit h-full w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <User
            name="John Doe"
            description="@fitness-enthusiast"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              size: "lg",
            }}
          />
          <Button size="sm">Change Avatar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
          <Input label="Email" placeholder="john.doe@example.com" />
          <Input label="Phone" placeholder="+1 234 567 8900" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Fitness Goals</h2>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Enter your fitness goals here..."
          ></textarea>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Preferred Gyms</h2>
          <div className="flex flex-wrap gap-2">
            {["GymA", "GymB", "GymC"].map((gym) => (
              <span
                key={gym}
                className="bg-primary text-white px-2 py-1 rounded-full text-sm"
              >
                {gym}
              </span>
            ))}
          </div>
        </div>

        <Button color="primary">Save Changes</Button>
      </Card>
    </div>
  );
}
