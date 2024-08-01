import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Fitness Networking. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4 text-gray-900 px-4 py-2 font-medium transition-colors"
          href="#services"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 text-gray-900 px-4 py-2 font-medium transition-colors"
          href="#privacy"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
