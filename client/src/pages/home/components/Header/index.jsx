import { Link, Image } from "@nextui-org/react";
import { fitness } from "@images";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center gap-2" href="#">
        <Image src={fitness} className="h-6 w-6" />
        <span className="hidden md:flex text-black/80 text-lg font-medium">
          Fitness Networking
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-gray-900 hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 hover:underline underline-offset-4"
          href="#about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium text-gray-900 hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
