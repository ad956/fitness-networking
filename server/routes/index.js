const express = require("express");
const router = express.Router();

const userRoutes = require("./api/userRoute");
const partnerRoutes = require("./api/partnerRoute");
const adminRoutes = require("./api/adminRoute");

router.use("/user", userRoutes);
router.use("/partner", partnerRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
