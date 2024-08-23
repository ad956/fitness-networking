import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthErrorFallback from "../AuthErrorFallback";

const ProtectedRoute = ({ requiredRole, children }) => {
  const user = useSelector((state) => state.auth.user);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    if (user.isAuthenticated) {
      if (requiredRole === "admin" && user.role !== "admin") {
        setStatusCode(403); // Forbidden
        return;
      }

      if (
        (requiredRole === "user" || requiredRole === "partner") &&
        user.role !== requiredRole
      ) {
        setStatusCode(401); // Unauthorized
        return;
      }
    } else {
      setStatusCode(401); // Unauthorized
    }
  }, [user.isAuthenticated, user.role, requiredRole]);

  if (!user.isAuthenticated) {
    return <AuthErrorFallback statusCode={statusCode} />;
  }

  return statusCode ? <AuthErrorFallback statusCode={statusCode} /> : children;
};

export default ProtectedRoute;
