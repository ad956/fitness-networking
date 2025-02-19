import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@store";

const PublicRoute = ({ children }) => {
  const { user } = useUserStore();

  if (user?.accessToken) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default PublicRoute;
