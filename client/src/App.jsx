import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import PartnerRoutes from "./routes/partnerRoutes";
import AdminRoutes from "./routes/adminRoutes";
import HomePage from "@pages/home-page";
import { LoginPage, SignupPage } from "@pages/auth";
import { ErrorFallback, PageNotFound } from "@components";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./pages/user";

const Root = () => {
  return <Outlet />;
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/*"
          element={
            <ProtectedRoute requiredRole="partner">
              <PartnerRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/error/*" element={<ErrorFallback />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
