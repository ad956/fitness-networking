const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validate-token.middleware");

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
router.use("/admin", validateToken, adminRoutes);
router.use("/partner", validateToken, partnerRoutes);
router.use("/user", validateToken, userRoutes);

module.exports = router;
