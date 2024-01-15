const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/adminController");
// validateToken

router.get("/", adminController.admin);
router.get("/login", adminController.login);

module.exports = router;
