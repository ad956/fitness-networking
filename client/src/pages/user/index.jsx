import { Layout } from "@components";
import {
  CreditStats,
  GymAvailability,
  GymMap,
  UpcomingClasses,
  WorkoutStats,
} from "./components/";

export default function UserLayout() {
  return (
    <Layout>
      <div className="flex flex-col h-screen overflow-y-scroll">
        <div className="p-8">
          <CreditStats purchased={100} spent={45} remaining={55} />
          <WorkoutStats />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GymAvailability currentUsers={15} maxCapacity={20} />
            <UpcomingClasses />
          </div>
          <GymMap />
        </div>
      </div>
    </Layout>
  );
}
