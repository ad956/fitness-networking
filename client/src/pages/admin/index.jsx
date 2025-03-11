import Layout from "@components/Layout";
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import GymMembers from "./GymMembers";
import GymOwners from "./GymOwners";

export default function AdminLayout() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="members" element={<GymMembers />} />
        <Route path="owners" element={<GymOwners />} />
      </Routes>
    </Layout>
  );
}
