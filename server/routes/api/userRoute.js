const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const validateToken = require("../../middleware/validateTokenHandler");

router.get("/", validateToken, userController.getUser);
router.post("/", validateToken, userController.allUsers);
router.post("/login", userController.login);
router.post("/register", userController.registerUser);
router.get("/credit", userController.registerUser);

module.exports = router;
