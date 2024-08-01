import React from "react";
import { IoSearchCircle } from "react-icons/io5";
import {
  BiCalendarEvent,
  BiWallet,
  BiHeart,
  BiDumbbell,
  BiUserCheck,
} from "react-icons/bi";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 dark:bg-gray-950">
    {icon}
    <h3 className="text-xl font-bold mt-4">{title}</h3>
    <p className="text-gray-500 mt-2 dark:text-gray-400">{description}</p>
  </div>
);

const featuresData = [
  {
    icon: <IoSearchCircle className="h-12 w-12 text-gray-900" />,
    title: "Explore Gyms",
    description:
      "Discover a wide range of gyms in your area and find the perfect fit for your fitness needs.",
  },
  {
    icon: <BiCalendarEvent className="h-12 w-10 text-gray-900" />,
    title: "Book Sessions",
    description:
      "Easily book gym sessions and classes at your convenience, with real-time availability.",
  },
  {
    icon: <BiWallet className="h-12 w-10 text-gray-900" />,
    title: "Earn and Spend",
    description:
      "Earn credits for your gym visits and use them to access exclusive perks and discounts.",
  },
  {
    icon: <BiHeart className="h-12 w-10 text-gray-900" />,
    title: "Personalized Recommendations",
    description:
      "Receive personalized workout and nutrition recommendations tailored to your fitness goals.",
  },
  {
    icon: <BiDumbbell className="h-12 w-10 text-gray-900" />,
    title: "Track Progress",
    description:
      "Track your fitness journey and monitor your progress over time with comprehensive analytics.",
  },
  {
    icon: <BiUserCheck className="h-12 w-10 text-gray-900" />,
    title: "Connect with Fitness Professionals",
    description:
      "Connect with certified trainers and nutritionists to get expert advice and guidance.",
  },
];

const FeatureSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureSection;
