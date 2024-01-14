const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const validateToken = require("../../middleware/validateTokenHandler");
const validatePasswordToken = require("../../middleware/PasswordTokenHandler");

router.get("/", validateToken, userController.getUser);
router.get("/all", validateToken, userController.allUsers);
router.post("/login", userController.login);
router.post("/register", userController.registerUser);
router.post("/forgot-password", userController.forgetPassword);
router.post("/reset-password", validateToken, userController.resetPassword);
router.get(
  "/reset-password/:token",
  validatePasswordToken,
  userController.setPassword
);

module.exports = router;
