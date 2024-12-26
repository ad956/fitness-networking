import React, { useEffect, useState } from "react";
import { useCheckAuth } from "@hooks";
import { SpinnerLoader } from "@components";
import AuthErrorFallback from "../AuthErrorFallback";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { data: authData, isLoading } = useCheckAuth();
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      if (authData?.user?.isAuthenticated) {
        if (requiredRole === "admin" && authData.user.role !== "admin") {
          setStatusCode(403); // Forbidden
          return;
        }

        if (
          (requiredRole === "user" || requiredRole === "partner") &&
          authData.user.role !== requiredRole
        ) {
          setStatusCode(401); // Unauthorized
          return;
        }
      } else {
        setStatusCode(401); // Unauthorized
      }
    }
  }, [
    isLoading,
    authData?.user?.isAuthenticated,
    authData?.user?.role,
    requiredRole,
  ]);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (!authData?.user?.isAuthenticated) {
    return <AuthErrorFallback statusCode={statusCode} />;
  }

  return statusCode ? <AuthErrorFallback statusCode={statusCode} /> : children;
};

export default ProtectedRoute;
