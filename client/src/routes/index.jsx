import { Routes, Route } from "react-router-dom";

import UserRoutes from "./userRoutes";
import PartnerRoutes from "./partnerRoutes";
import AdminRoutes from "./adminRoutes";
import Login from "@pages/auth/Login/";
import Signup from "@pages/auth/Signup";
import { ErrorPage } from "@components";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<>Hey Boii</>} /> */}
      <Route path="/" element={<UserRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/partner/*" element={<PartnerRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
