import Layout from "@components/Layout";
import { Routes, Route } from "react-router-dom";

export default function AdminLayout() {
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <section className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<p>Admin Dashboard</p>} />
            <Route path="/partners" element={<p>Partner Management</p>} />
          </Routes>
        </section>
      </div>
    </Layout>
  );
}
