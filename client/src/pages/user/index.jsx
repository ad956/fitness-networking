// import UserRoutes from "@routes/userRoutes";
// Sidebar, Headbar
import { Layout } from "@components";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";

export default function UserLayout() {
  return (
    <Layout>
      <section className="h-screen w-full flex flex-row border2 border-black">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qrcode" element={<p>Profile</p>} />
        </Routes>
      </section>
    </Layout>
  );
}
