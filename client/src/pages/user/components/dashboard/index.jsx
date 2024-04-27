import React from "react";
import { Card, User } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { CreditSpentLine } from "../Charts";
import { useQRCode } from "next-qrcode";

export default function Dashboard() {
  const { SVG } = useQRCode();
  const text = "loremipsunsbhvhbh";

  return (
    <div className="font-outfit h-full w-full grid grid-rows-7 grid-cols-6 gap-3 border2 border-rose-600">
      {/* header */}
      <div className="row-span-1 col-span-6 flex justify-between items-center px-10">
        <h1 className="text-xl font-medium tracking-wide">Dashboard</h1>
        <div className="flex flex-row gap-5 items-center">
          <IoNotificationsOutline size={20} />
          <User
            name="Anand Suthar"
            description="@gym-member"
            avatarProps={{
              src: "https://images.alphacoders.com/994/994973.jpg",
            }}
            classNames={{
              name: "font-medium",
              description: "font-medium",
            }}
          />
        </div>
      </div>

      {/* qr code */}
      <Card
        radius="lg"
        className="row-span-3 col-span-2 flex flex-row items-between px-2 border-2"
      >
        <Card
          id="qr-code-card"
          className="w-3/5 p-5 flex flex-col justify-center items-center"
        >
          <SVG
            text={text}
            options={{
              margin: 2,
              width: 180,
              color: {
                dark: "#000000",
                light: "#ffffff",
              },
            }}
          />
        </Card>

        <div className="flex flex-col justify-evenly h-full">
          <Card radius="lg" className="h-16 border-2">
            Current Gym
          </Card>
          <Card radius="lg" className="h-16 border-2">
            credit balance
          </Card>
          <Card radius="lg" className="h-16 border-2">
            totals money spent
          </Card>
        </div>
      </Card>
      {/* credt balances */}

      {/* transactions */}
      <div className="row-span-3 col-span-6 border-2">
        <Card radius="lg" className=""></Card>
      </div>
    </div>
  );
}
