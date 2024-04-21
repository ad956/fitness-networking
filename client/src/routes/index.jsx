import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserRoutes from "./userRoutes";
import PartnerRoutes from "./partnerRoutes";
import AdminRoutes from "./adminRoutes";
import LandingPage from "@pages/LandingPage";
import { LoginPage, SignupPage } from "@pages/auth";
import { PageNotFound, ErrorFallback } from "@components";

export default function AppRoutes() {
  const { accessToken, userRole } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Landing page route */}
      <Route path="/" element={<LandingPage />} />

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes */}
      {accessToken && userRole && (
        <>
          {userRole === "user" && (
            <Route path="/user/*" element={<UserRoutes />} />
          )}
          {userRole === "partner" && (
            <Route path="/partner/*" element={<PartnerRoutes />} />
          )}
          {userRole === "admin" && (
            <Route path="/admin/*" element={<AdminRoutes />} />
          )}
        </>
      )}

      <Route path="/error/*" element={<ErrorFallback />} />
      {/* Route not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
