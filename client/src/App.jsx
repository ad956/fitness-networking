import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UserRoutes from "./routes/userRoutes";
import PartnerRoutes from "./routes/partnerRoutes";
import AdminRoutes from "./routes/adminRoutes";
import LandingPage from "@pages/LandingPage";
import { LoginPage, SignupPage } from "@pages/auth";
import { ErrorFallback, PageNotFound } from "@components";
import ProtectedRoute from "./components/ProtectedRoute";

const Root = () => {
  return <Outlet />;
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute requiredRole="user">
              <UserRoutes />
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
