import { Layout } from "@components";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import QRCode from "./QRCode";
import Membership from "./Membership";
import Transactions from "./Transactions";
import Profile from "./Profile";

export default function UserLayout() {
  return (
    <Layout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="qr-code" element={<QRCode />} />
        <Route path="membership" element={<Membership />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}
