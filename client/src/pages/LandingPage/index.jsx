import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector hook to access Redux state
import { removeAuthData } from "../../features/auth/authSlice";
import { Link, Image, Input, Textarea, Button, Card } from "@nextui-org/react";
import { fitness, keyfeatures, signin_png } from "@images";
import { SeoHelmet } from "@components";
import { IoSearchCircle } from "react-icons/io5";
import {
  BiCalendarEvent,
  BiDumbbell,
  BiHeart,
  BiUserCheck,
  BiWallet,
} from "react-icons/bi";
import axios from "axios";

export default function LandingPage() {
  // const authState = useSelector((state) => state.auth);
  // const isLoggedIn = authState && !!authState.accessToken;

  // const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleContactFormSubmission = async (e) => {
    e.preventDefault();

    try {
      const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
      const response = await axios.post(
        `${SERVER_URL}admin/contact-us`,
        formData
      );

      if (response.status === 200) {
        setFormData({ name: "", email: "", message: "" });
        console.log("Form submitted successfully!");
      } else {
        console.error(
          "Error submitting contact form. Server responded with status: ",
          response.status
        );
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  const title = "Fitness Networking";
  const canonical = window.location.href;

  return (
    <div className="font-Inter h-full w-full">
      <SeoHelmet title={title} canonical={canonical} />
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
      <main className="flex-1 mx-auto">
        {/* intro */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 grid place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Fitness Networking: Your Gateway to Unlimited Gym Access!
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Welcome to Fitness Networking! Break free from traditional gym
                  memberships and access a network of gyms across cities with
                  ease. Discover, book, and enjoy workouts at your fingertips.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<IoSearchCircle className="h-12 w-12 text-gray-900" />}
                title="Explore Gyms"
                description="Discover a wide range of gyms in your area and find the perfect fit for your fitness needs."
              />
              <FeatureCard
                icon={<BiCalendarEvent className="h-12 w-10 text-gray-900" />}
                title="Book Sessions"
                description="Easily book gym sessions and classes at your convenience, with real-time availability."
              />
              <FeatureCard
                icon={<BiWallet className="h-12 w-10 text-gray-900" />}
                title="Earn and Spend"
                description="Earn credits for your gym visits and use them to access exclusive perks and discounts."
              />
              {/* Additional Features */}
              <FeatureCard
                icon={<BiHeart className="h-12 w-10 text-gray-900" />}
                title="Personalized Recommendations"
                description="Receive personalized workout and nutrition recommendations tailored to your fitness goals."
              />
              <FeatureCard
                icon={<BiDumbbell className="h-12 w-10 text-gray-900" />}
                title="Track Progress"
                description="Track your fitness journey and monitor your progress over time with comprehensive analytics."
              />
              <FeatureCard
                icon={<BiUserCheck className="h-12 w-10 text-gray-900" />}
                title="Connect with Fitness Professionals"
                description="Connect with certified trainers and nutritionists to get expert advice and guidance."
              />
            </div>
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
                {memberPlans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
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
                {ownerPlans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* about us */}
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
                  mission is to provide a seamless and accessible fitness
                  experience for everyone.
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
        {/* contact us */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 grid place-items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800">
                  Contact Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have a question or want to learn more? Fill out the form below
                  and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <form
                  className="grid gap-4"
                  onSubmit={handleContactFormSubmission}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        label="Name"
                        variant="underlined"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        value={formData.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        label="Email"
                        variant="underlined"
                        placeholder="Enter your email"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      label="Message"
                      variant="underlined"
                      className="min-h-[120px]"
                      id="message"
                      placeholder="Enter your message"
                      onChange={handleChange}
                      value={formData.message}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full inline-flex h-9 items-center justify-center rounded-md 
                    bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
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
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 dark:bg-gray-950">
    {icon}
    <h3 className="text-xl font-bold mt-4">{title}</h3>
    <p className="text-gray-500 mt-2 dark:text-gray-400">{description}</p>
  </div>
);

const PricingCard = ({ title, price, description, buttonText }) => (
  <Card
    shadow="lg"
    className="bg-white dark:bg-gray-800 rounded-lg flex flex-col"
  >
    <div className="p-4 border-b dark:border-gray-700">
      <p className="text-xl font-bold text-black dark:text-white">{title}</p>
      <p className="text-gray-600 dark:text-gray-400">{price}</p>
    </div>
    <div className="flex-grow p-4">
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
    <div className="p-4 border-t dark:border-gray-700">
      <Button
        className="w-full h-10 font-medium bg-black dark:bg-white text-white dark:text-black"
        shadow="sm"
        as={Link}
        href="/signup"
      >
        {buttonText}
      </Button>
    </div>
  </Card>
);

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
