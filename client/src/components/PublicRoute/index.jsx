import React from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@hooks";

const PublicRoute = ({ children }) => {
  const { data: authData, isLoading } = useCheckAuth();

  if (authData?.user?.isAuthenticated) {
    return <Navigate to={`/${auth.role}`} replace />;
  }

  return children;
};

export default PublicRoute;
