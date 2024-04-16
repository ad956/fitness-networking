const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const validateToken = require("../../middleware/validateTokenHandler");
const validatePasswordToken = require("../../middleware/PasswordTokenHandler");
const verifyGoogleIdToken = require("../../middleware/verifyGoogleIdToken");
// const googleAuth = require("./api/googleAuth");

router.get("/", validateToken, userController.getUser);
router.get("/all", validateToken, userController.allUsers);
router.post("/login", userController.login);
router.get("/login/:token", validatePasswordToken, userController.redirectUser);
router.post("/google-auth", verifyGoogleIdToken, userController.googleAuth);
router.post("/register", userController.registerUser);
router.post("/forgot-password", userController.forgetPassword); // at login
router.post("/reset-password", validateToken, userController.resetPassword); // using profile
router.get(
  "/reset-password/:token",
  validatePasswordToken,
  userController.setPassword
);

router.get("/credit", validateToken, userController.availableCredits);
router.post("/credit/:plan", validateToken, userController.purchaseCredits);

module.exports = router;
