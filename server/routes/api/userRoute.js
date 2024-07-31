const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const validateToken = require("../../middleware/validateTokenHandler");
const verifyGoogleIdToken = require("../../middleware/verifyGoogleIdToken");

router.get("/", validateToken, userController.getUser);
router.get("/all", validateToken, userController.allUsers);
router.post("/login", userController.login);
router.get("/verify/:token", userController.verifyUser); // verify user after login

router.post("/google-auth", verifyGoogleIdToken, userController.googleAuth);
router.post("/register", userController.registerUser);
router.post("/forgot-password", userController.forgetPassword); // at login
router.post("/reset-password", validateToken, userController.resetPassword); // using profile
router.get("/reset-password/:token", validateToken, userController.setPassword);

router.get("/credit", validateToken, userController.availableCredits);
router.post("/credit/:plan", validateToken, userController.purchaseCredits);

module.exports = router;
