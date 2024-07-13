import { Card, Input, User, Button } from "@nextui-org/react";
import React from "react";

export default function Headbar() {
  return (
    <div className="h-16 w-fullflex flex-row justify-between items-center px-10">
      <div className="flex flex-col">
        <p className="font-medium text-tiny">Good Morning</p>
        <h2 className="font-semibold text-sm">Welcome Back</h2>
      </div>

      {/* <div className="flex w-2/5 justify-between items-center"> */}
      <Button isIconOnly className="bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-bell"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      </Button>

      <User
        name="Anand Suthar"
        avatarProps={{
          src: "https://cdn-icons-png.freepik.com/256/2936/2936886.png?semt=ais_hybrid",
        }}
        classNames={{
          name: "font-medium",
        }}
      />
      {/* </div> */}
    </div>
  );
}
