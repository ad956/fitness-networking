const express = require("express");
const router = express.Router();

const adminRoutes = require("./api/admin.routes");
const authRoutes = require("./api/auth.routes");
const partnerRoutes = require("./api/partner.routes");
const userRoutes = require("./api/user.routes");

/*
- '/admin'  : for administrative tasks
- '/partner': for gym owners
- '/user'   : for gym members
*/

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/partner", partnerRoutes);
router.use("/user", userRoutes);

module.exports = router;
