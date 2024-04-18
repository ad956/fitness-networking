import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserRoutes from "./userRoutes";
import PartnerRoutes from "./partnerRoutes";
import AdminRoutes from "./adminRoutes";
import LandingPage from "@pages/LandingPage";
import { LoginPage, SignupPage } from "@pages/auth";
import { PageNotFound } from "@components";

export default function AppRoutes() {
  const { accessToken, userRole } = useSelector((state) => state.auth);

  // Define route paths
  const userRoutes = "/user";
  const partnerRoutes = "/partner";
  const adminRoutes = "/admin";

  // Redirect path based on user role
  let redirectPath = "/";
  if (accessToken && userRole) {
    switch (userRole) {
      case "user":
        redirectPath = userRoutes;
        break;
      case "partner":
        redirectPath = partnerRoutes;
        break;
      case "admin":
        redirectPath = adminRoutes;
        break;
      default:
        redirectPath = "/";
        break;
    }
  }

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
            <Route path={userRoutes + "/*"} element={<UserRoutes />} />
          )}
          {userRole === "partner" && (
            <Route path={partnerRoutes + "/*"} element={<PartnerRoutes />} />
          )}
          {userRole === "admin" && (
            <Route path={adminRoutes + "/*"} element={<AdminRoutes />} />
          )}
        </>
      )}

      {/* Route not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
