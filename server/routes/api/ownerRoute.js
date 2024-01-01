const express = require("express");
const router = express.Router();

// Middleware for gym owner authentication

// Route to manage gym information
router.get("/manage-gym", (req, res) => {
  // Display gym management options
});

// Route to manage gym bookings
router.get("/manage-bookings", (req, res) => {
  // Display booking management options
});

// Other routes for gym owners

module.exports = router;
