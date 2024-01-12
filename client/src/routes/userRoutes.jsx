import { Routes, Route } from "react-router-dom";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<p>Index page of user</p>} />
    <Route path="/profile" element={<p>Profile</p>} />
  </Routes>
);

export default UserRoutes;
