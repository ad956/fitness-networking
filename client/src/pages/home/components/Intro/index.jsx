import { Link } from "@nextui-org/react";

export default function Intro() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 grid place-items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Fitness Networking: Your Gateway to Unlimited Gym Access!
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Welcome to Fitness Networking! Break free from traditional gym
              memberships and access a network of gyms across cities with ease.
              Discover, book, and enjoy workouts at your fingertips.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/signup"
            >
              Sign Up
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border text-gray-900 border-gray-00 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
