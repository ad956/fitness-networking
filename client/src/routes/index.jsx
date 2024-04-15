import { Routes, Route } from "react-router-dom";

import UserRoutes from "./userRoutes";
import PartnerRoutes from "./partnerRoutes";
import AdminRoutes from "./adminRoutes";
import { LoginPage, SignupPage } from "@pages/auth";
import { ErrorFallback, PageNotFound } from "@components";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserRoutes />} />
      {/* ate landing page aavi */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/partner/*" element={<PartnerRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/error/*" element={<ErrorFallback />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
