import UserRoutes from "@routes/userRoutes";
import Sidebar from "./components/sidebar";

export default function UserLayout() {
  return (
    <section className="h-full w-full flex flex-row">
      <Sidebar />
      <UserRoutes />
    </section>
  );
}
