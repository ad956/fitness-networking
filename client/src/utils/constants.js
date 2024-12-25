const MEMBERSHIP_PLANS = [
  {
    creditPoints: 300,
    price: 1500,
    description: "Ideal for occasional gym visits.",
  },
  {
    creditPoints: 900,
    price: 3000,
    description: "Great for regular gym-goers.",
  },
  {
    creditPoints: 1800,
    price: 5000,
    description: "Perfect for fitness enthusiasts.",
  },
  {
    creditPoints: 3600,
    price: 8000,
    description: "Ideal for frequent gym-goers.",
  },
  {
    creditPoints: 4200,
    price: 12000,
    description: "Great value for fitness enthusiasts.",
  },
  {
    creditPoints: 5000,
    price: 15000,
    description: "Ultimate plan for gym enthusiasts.",
  },
];

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/";

export { MEMBERSHIP_PLANS, SERVER_URL };
