import { Layout } from "@components";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import QRCodePage from "./QRCode";
import MembershipPlans from "./MembershipPlans";
import Transactions from "./Transactions";
import Profile from "./Profile";
import { PageNotFound } from "@components";

export default function UserLayout() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="qr-code" element={<QRCodePage />} />
        <Route path="membership" element={<MembershipPlans />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Layout>
  );
}
