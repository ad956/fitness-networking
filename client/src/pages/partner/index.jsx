import Layout from "@components/Layout";
import { Routes, Route } from "react-router-dom";

export default function PartnerLayout() {
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <section className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<p>Partner Dashboard</p>} />
            <Route path="/members" element={<p>Member Management</p>} />
          </Routes>
        </section>
      </div>
    </Layout>
  );
}
