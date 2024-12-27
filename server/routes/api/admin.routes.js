const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin.controller");

router.get("/", adminController.getAdmin);
router.post("/login", adminController.login);
router.post("/register", adminController.register);
router.get("/users", adminController.getUsers);
router.get("/partners", adminController.getPartners);
router.post("/contact-us", adminController.contactUsForm);

module.exports = router;
