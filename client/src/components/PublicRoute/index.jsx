import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.user);

  if (auth.isAuthenticated) {
    return <Navigate to={`/${auth.role}`} replace />;
  }

  return children;
};

export default PublicRoute;
