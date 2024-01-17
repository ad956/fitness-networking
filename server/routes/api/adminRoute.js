const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/adminController");
const validateToken = require("../../middleware/validateTokenHandler");

router.get("/", validateToken, adminController.getAdmin);
router.post("/login", adminController.login);
router.post("/register", adminController.register);
router.post("/users", adminController.getUsers);
router.post("/partners", adminController.getPartners);

module.exports = router;
