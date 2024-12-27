const express = require("express");
const router = express.Router();

const userRoutes = require("./api/user.routes");
const partnerRoutes = require("./api/partner.routes");
const adminRoutes = require("./api/admin.routes");

/*
  - '/user'   : for gym members
  - '/partner': for gym owners
  - '/admin'  : for administrative tasks
*/

router.use("/user", userRoutes);
router.use("/partner", partnerRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
