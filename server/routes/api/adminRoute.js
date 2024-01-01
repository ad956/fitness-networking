const express = require("express");
const router = express.Router();

// Middleware for admin authentication

// Route to manage users (e.g., view, edit, delete)
router.get("/manage-users", (req, res) => {
  // Display user management options
});

// Route to manage gyms (e.g., view, edit, delete)
router.get("/manage-gyms", (req, res) => {
  // Display gym management options
});

// Other routes for admin

module.exports = router;
