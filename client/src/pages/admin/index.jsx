import Layout from "@components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import GymMembers from "./GymMembers";
import GymOwners from "./GymOwners";

export default function AdminLayout() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<GymMembers />} />
        <Route path="/owners" element={<GymOwners />} />
      </Routes>
    </Layout>
  );
}
