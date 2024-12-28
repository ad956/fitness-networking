import React from "react";
import { Navigate } from "react-router-dom";
import { SpinnerLoader } from "@components";
import { useCheckAuth } from "@hooks";

const PublicRoute = ({ children }) => {
  const { data: authData, isLoading } = useCheckAuth();

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <SpinnerLoader />
      </div>
    );
  }

  if (authData?.isAuthenticated) {
    return <Navigate to={`/${authData.role}`} replace />;
  }

  return children;
};

export default PublicRoute;
