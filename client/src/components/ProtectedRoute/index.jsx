import React, { useEffect, useState } from "react";
import { useCheckAuth } from "@hooks";
import { SpinnerLoader } from "@components";
import AuthErrorFallback from "../AuthErrorFallback";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { data: authData, isLoading } = useCheckAuth();
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      // if the user is not authenticated
      if (!authData?.isAuthenticated) {
        setStatusCode(401); // Unauthorized
        return;
      }

      // check if the user has the correct role
      if (requiredRole === "admin" && authData?.role !== "admin") {
        setStatusCode(403); // Forbidden
        return;
      }

      if (
        (requiredRole === "user" || requiredRole === "partner") &&
        authData?.role !== requiredRole
      ) {
        setStatusCode(401); // Unauthorized
        return;
      }
    }
  }, [isLoading, authData?.isAuthenticated, authData?.role, requiredRole]);

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <SpinnerLoader />
      </div>
    );
  }

  // handle error state if user is not authenticated or doesn't have required role
  if (!authData?.isAuthenticated || statusCode) {
    return <AuthErrorFallback statusCode={statusCode} />;
  }

  return children; // user is authenticated and has the correct role
};

export default ProtectedRoute;
