import React from "react";
import {
  Input,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { LuBell, LuSearch } from "react-icons/lu";
import { useLogoutUser } from "@hooks";

export default function Headbar() {
  const { logout, isLoading } = useLogoutUser();

  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, John!</h1>
        <p className="text-gray-500">
          Track your fitness journey and gym activities
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Button isIconOnly variant="light" className="relative">
          <LuBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">john@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={logout}
              isLoading={isLoading}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
