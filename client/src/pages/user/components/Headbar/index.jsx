// import React from "react";
// import { FaCoins, FaUser } from "react-icons/fa";
// import { Image, User } from "@nextui-org/react";
// import { NavLink } from "react-router-dom";

// export default function Headbar({ userData }) {
//   return (
//     <header className="grid place-items-end bg-white shadow-md text-gray-800 py-3 px-8">
//       <div className="flex items-center gap-6">
//         <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
//           <FaCoins className="text-yellow-500 mr-2" />
//           <div>
//             <p className="font-semibold text-blue-600">
//               {userData.creditPoints} pts
//             </p>
//             <p className="text-xs text-gray-500">Credit Balance</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <User
//             name={"Anand"}
//             avatarProps={{
//               src: "https://i.pinimg.com/736x/fc/ce/92/fcce92b6dd2ebb5259426a424a6f983d.jpg",
//             }}
//             className=""
//             description={
//               <NavLink
//                 href={`/settings`}
//                 className="text-xs text-primary"
//               >{`@${"ad956"}`}</NavLink>
//             }
//           />
//         </div>
//       </div>
//     </header>
//   );
// }

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

export default function Headbar() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, John!</h1>
        <p className="text-gray-500">
          Track your fitness journey and gym activities
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem]",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search..."
          size="sm"
          startContent={<LuSearch size={18} />}
          type="search"
        />

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
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
