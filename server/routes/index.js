const express = require("express");
const router = express.Router();

const userRoutes = require("./api/userRoute");
const partnerRoutes = require("./api/partnerRoute");
const adminRoutes = require("./api/adminRoute");

router.use("/api/user", userRoutes);
router.use("/api/partner", partnerRoutes);
router.use("/api/admin", adminRoutes);

module.exports = router;
