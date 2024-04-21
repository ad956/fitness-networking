import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserRoutes from "./routes/userRoutes";
import PartnerRoutes from "./routes/partnerRoutes";
import AdminRoutes from "./routes/adminRoutes";
import LandingPage from "@pages/LandingPage";
import { LoginPage, SignupPage } from "@pages/auth";
import { PageNotFound, ErrorFallback } from "@components";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/partner/*" element={<PartnerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/error/*" element={<ErrorFallback />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
