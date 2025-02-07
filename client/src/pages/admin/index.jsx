import Layout from "@components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import GymMembers from "./GymMembers";
import GymOwners from "./GymOwners";

export default function AdminLayout() {
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <section className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<GymMembers />} />
            <Route path="/owners" element={<GymOwners />} />
          </Routes>
        </section>
      </div>
    </Layout>
  );
}
