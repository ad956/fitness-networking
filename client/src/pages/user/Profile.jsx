import React from "react";
import { ProfileSettings } from "./components";

export default function Profile() {
  const user = {
    firstname: "Anand",
    lastname: "Suthar",
    username: "ad956",
    email: "ad@exmaple.com",
    currentPassword: "",
    newPassword: "",
    profilePicture:
      "https://i.pinimg.com/736x/fc/ce/92/fcce92b6dd2ebb5259426a424a6f983d.jpg",
    dob: "",
    contact: "7898653422",
    gender: "Male",
    address: {
      address_line_1: "Gokuldham Society",
      address_line_2: "Powder Gali, Gore Gav East",
      city: "Mumbai",
      state: "Maharashtra",
      zip_code: "400060",
      country: "India",
    },
  };
  return <ProfileSettings user={user} />;
}
