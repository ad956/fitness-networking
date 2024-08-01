import { Link, Image, Button } from "@nextui-org/react";
import { signin_png } from "@images";

export default function About() {
  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 grid place-items-center"
    >
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              About Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Who We Are
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Fitness Networking is a revolutionary platform that connects
              fitness enthusiasts with a network of gyms across cities. Our
              mission is to provide a seamless and accessible fitness experience
              for everyone.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="h-10 px-8 text-sm font-medium bg-gray-900 text-white"
                radius="lg"
                as={Link}
                href="#contact"
              >
                Learn More
              </Button>
              <Button
                className="h-10 px-8 text-sm font-medium bg-gray-900 text-white"
                radius="lg"
                as={Link}
                href="/login"
              >
                Join Now
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="About Us"
              className="mx-auto aspect-video lg:aspect-auto overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="310"
              src={signin_png}
              width="550"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
