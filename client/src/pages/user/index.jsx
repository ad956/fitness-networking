import { Layout } from "@components";
import { CreditStats, GymMap, WorkoutStats } from "./components/";

export default function UserLayout() {
  return (
    <Layout>
      <div className="flex flex-col h-screen overflow-y-scroll">
        <div className="p-8">
          <CreditStats purchased={100} spent={45} remaining={55} />
          <WorkoutStats />
          <GymMap />
        </div>
      </div>
    </Layout>
  );
}
