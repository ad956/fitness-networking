import React from "react";
import { Card, Button, Link } from "@nextui-org/react";

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

const PricingSection = ({ plans, title }) => {
  return plans.map((plan, index) => <PricingCard key={index} {...plan} />);
};

export default PricingSection;
