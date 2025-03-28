const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");
const verifyGoogleIdToken = require("../../middleware/verify-google-id-token.middleware");

router.post("/login", authController.login);
router.post("/demo-login", authController.demoLogin);
router.post("/logout", authController.logout);
router.post("/register", authController.register);
router.post("/google-auth", verifyGoogleIdToken, authController.googleAuth);
router.post("/forgot-password", authController.forgotPassword);
router.get("/verify", authController.verifyUser);
router.post("/validate-login", authController.validateLogin);

module.exports = router;
