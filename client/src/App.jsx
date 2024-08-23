import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/home";
import { LoginPage, SignupPage } from "@pages/auth";
import {
  ErrorFallback,
  PageNotFound,
  ProtectedRoute,
  PublicRoute,
} from "@components";
import { AdminLayout, PartnerLayout, UserLayout } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <HomePage />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      ),
    },
    {
      path: "/user/*",
      element: (
        <ProtectedRoute requiredRole="user">
          <UserLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/partner/*",
      element: (
        <ProtectedRoute requiredRole="partner">
          <PartnerLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/*",
      element: (
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
    },
    { path: "/error/*", element: <ErrorFallback /> },
    { path: "*", element: <PageNotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
