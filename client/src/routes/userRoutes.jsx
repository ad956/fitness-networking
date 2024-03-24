import { Routes, Route } from "react-router-dom";
import UserLayout from "@pages/user";
const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<UserLayout />} />
    <Route path="/profile" element={<p>Profile</p>} />
  </Routes>
);

export default UserRoutes;
