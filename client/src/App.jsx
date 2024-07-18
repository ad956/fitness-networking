import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartnerRoutes from "./routes/partnerRoutes";
import AdminRoutes from "./routes/adminRoutes";
import HomePage from "@pages/home-page";
import { LoginPage, SignupPage } from "@pages/auth";
import { ErrorFallback, PageNotFound } from "@components";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./pages/user";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
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
          <PartnerRoutes />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/*",
      element: (
        <ProtectedRoute requiredRole="admin">
          <AdminRoutes />
        </ProtectedRoute>
      ),
    },
    { path: "/error/*", element: <ErrorFallback /> },
    { path: "*", element: <PageNotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
