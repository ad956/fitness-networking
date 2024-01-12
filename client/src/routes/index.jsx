import { Routes, Route } from "react-router-dom";

import UserRoutes from "./userRoutes";
import PartnerRoutes from "./partnerRoutes";
import AdminRoutes from "./adminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<>Hey Boii</>} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/partner/*" element={<PartnerRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
