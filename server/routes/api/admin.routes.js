const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin.controller");
const validateToken = require("../../middleware/validateTokenHandler");

router.get("/", validateToken, adminController.getAdmin);
router.post("/login", adminController.login);
router.post("/register", adminController.register);
router.get("/users", validateToken, adminController.getUsers);
router.get("/partners", validateToken, adminController.getPartners);
router.post("/contact-us", adminController.contactUsForm);

module.exports = router;
