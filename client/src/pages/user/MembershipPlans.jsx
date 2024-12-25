import React from "react";
import { PlansGrid } from "./components";
import { MEMBERSHIP_PLANS } from "@constants";

export default function MembershipPlans() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Membership Plans
          </h2>
          <p className="text-gray-600">
            Choose the perfect plan that fits your fitness goals
          </p>
        </div>
        <PlansGrid plans={MEMBERSHIP_PLANS} />
      </main>
    </div>
  );
}
