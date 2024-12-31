import React from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@hooks";

const PublicRoute = ({ children }) => {
  const { data: authData } = useCheckAuth();

  if (authData?.isAuthenticated) {
    return <Navigate to={`/${authData.role}`} replace />;
  }

  return children;
};

export default PublicRoute;
