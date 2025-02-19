import React, { useEffect, useState } from "react";
import { useUserStore } from "@store";
import AuthErrorFallback from "../AuthErrorFallback";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user } = useUserStore();

  const [statusCode, setStatusCode] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(true);

    // User is not authenticated
    if (!user?.accessToken) {
      setStatusCode(401);
    }
    // User has the wrong role (admin check)
    else if (requiredRole === "admin" && user?.role !== "admin") {
      setStatusCode(403);
    }
    // User has the wrong role
    else if (requiredRole !== user?.role) {
      setStatusCode(401);
    }
    // User is valid
    else {
      setStatusCode(null);
    }

    setIsChecking(false);
  }, [user?.accessToken, user?.role, requiredRole]);

  if (isChecking) return null;

  // Handle error state if user is not authenticated or doesn't have required role
  if (statusCode) {
    return <AuthErrorFallback statusCode={statusCode} />;
  }

  return children; // User is authenticated and has the correct role
};

export default ProtectedRoute;
