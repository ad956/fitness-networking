const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/adminController");
const validateToken = require("../../middleware/validateTokenHandler");

router.get("/", validateToken, adminController.getAdmin);
router.post("/login", adminController.login);
router.post("/register", adminController.register);
router.get("/users", validateToken, adminController.getUsers);
router.get("/partners", validateToken, adminController.getPartners);

module.exports = router;
