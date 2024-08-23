import React from "react";
import { Link } from "@nextui-org/react";
import { keyfeatures } from "@images";
import { SeoHelmet } from "@components";

import {
  About,
  Contact,
  FeatureSection,
  Footer,
  Header,
  Intro,
  PricingSection,
} from "./components";

export default function HomePage() {
  return (
    <div className="font-Inter h-full w-full">
      <SeoHelmet
        title="Fitness Networking"
        description="Fitness Networking is your ultimate platform to connect with fitness enthusiasts, track your progress, and achieve your health goals together."
        keywords={[
          "fitness",
          "networking",
          "health tracking",
          "social fitness",
          "wellness community",
        ]}
        canonical={window.location.href}
      />
      <Header />
      <main className="flex-1 mx-auto">
        {/* intro */}
        <Intro />
        {/* key features */}
        <section
          id="features"
          className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-800 grid place-items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="Fitness Networking"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src={keyfeatures}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800">
                    Key Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Your Fitness Journey Starts Here
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Explore gyms, book sessions, purchase and spend credits,
                    leave reviews, and stay informed with notifications — all in
                    one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/signup"
                  >
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md text-gray-900 border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#contact"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* feature cards */}
          <div className="container px-4 md:px-6 mt-24">
            <FeatureSection />
          </div>
        </section>
        {/* pricing */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 grid place-items-center"
        >
          <div className="container px-4 md:px-6 space-y-14">
            {/* gym members plans */}
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Credit Plans for Gym Members
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Choose a credit plan that fits your fitness needs.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <PricingSection
                  plans={memberPlans}
                  title="Plans for Gym Owners"
                />
              </div>
            </div>
            {/* gym owner plans */}
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Fees for Gym Owners
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore the fee structure for gym owners to join Fitness
                  Networking.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <PricingSection
                  plans={ownerPlans}
                  title="Plans for Gym Owners"
                />
              </div>
            </div>
          </div>
        </section>
        {/* about us */}
        <About />
        {/* contact us */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

//  data for gym members
const memberPlans = [
  {
    title: "300 Credit Points",
    price: "₹1500.00",
    description: "Ideal for occasional gym visits.",
    buttonText: "Buy Now",
  },
  {
    title: "900 Credit Points",
    price: "₹3000.00",
    description: "Great for regular gym-goers.",
    buttonText: "Buy Now",
  },
  {
    title: "1800 Credit Points",
    price: "₹5000.00",
    description: "Perfect for fitness enthusiasts.",
    buttonText: "Buy Now",
  },
  {
    title: "3600 Credit Points",
    price: "₹8000.00",
    description: "Ideal for frequent gym-goers.",
    buttonText: "Buy Now",
  },
  {
    title: "4200 Credit Points",
    price: "₹12000.00",
    description: "Great value for fitness enthusiasts.",
    buttonText: "Buy Now",
  },
  {
    title: "5000 Credit Points",
    price: "₹15000.00",
    description: "Maximum value for fitness enthusiasts.",
    buttonText: "Buy Now",
  },
];

// data for owner cards
const ownerPlans = [
  {
    title: "Basic Membership",
    price: "₹1000/month",
    description:
      "Includes basic gym listing and access to the Fitness Networking platform.",
    buttonText: "Buy Now",
  },
  {
    title: "Premium Membership",
    price: "₹2500/month",
    description:
      "Includes enhanced gym listing, priority placement, and advanced analytics.",
    buttonText: "Buy Now",
  },
  {
    title: "Enterprise Membership",
    price: "₹5000/month",
    description:
      "Includes custom branding, dedicated account manager, and advanced reporting.",
    buttonText: "Buy Now",
  },
];
