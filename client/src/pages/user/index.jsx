// import UserRoutes from "@routes/userRoutes";
// Sidebar, Headbar
import { Layout } from "@components";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Membership, Transactions, Profile } from "./components/";

export default function UserLayout() {
  return (
    <Layout>
      <section className="h-screen w-full flex flex-row overflow-y-scroll">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qrcode" element={<p>Profile</p>} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </section>
    </Layout>
  );
}
