// import UserRoutes from "@routes/userRoutes";
import Headbar from "./components/headbar";
import Sidebar from "./components/sidebar";

export default function UserLayout() {
  return (
    <section className="h-full w-full flex flex-row">
      <Headbar />
      {/* <Sidebar /> */}
      {/* <UserRoutes /> */}
    </section>
  );
}
