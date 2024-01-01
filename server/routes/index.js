const express = require("express");
const router = express.Router();

const userRoutes = require("./api/userRoute");
const ownerRoutes = require("./api/ownerRoute");
const adminRoutes = require("./api/adminRoute");

router.use("/api/user", userRoutes);
router.use("/api/owner", ownerRoutes);
router.use("/api/admin", adminRoutes);

module.exports = router;
