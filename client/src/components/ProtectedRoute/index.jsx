import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthErrorFallback from "../AuthErrorFallback";

const ProtectedRoute = ({ requiredRole, children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userRole = useSelector((state) => state.auth.userRole);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    if (accessToken) {
      if (requiredRole === "admin" && userRole !== "admin") {
        setStatusCode(403); // Forbidden
        return;
      }

      if (
        (requiredRole === "user" || requiredRole === "partner") &&
        userRole !== requiredRole
      ) {
        setStatusCode(401); // Unauthorized
        return;
      }
    } else {
      setStatusCode(401); // Unauthorized
    }
  }, [accessToken, userRole, requiredRole]);

  if (!accessToken) {
    return <AuthErrorFallback statusCode={statusCode} />;
  }

  return statusCode ? <AuthErrorFallback statusCode={statusCode} /> : children;
};

export default ProtectedRoute;
