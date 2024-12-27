const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const validateToken = require("../../middleware/validateTokenHandler");
const verifyGoogleIdToken = require("../../middleware/verifyGoogleIdToken");

router.get("/", validateToken, userController.getUser);
router.get("/all", validateToken, userController.allUsers);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/verify/:token", userController.verifyUser); // email login link verification
router.get("/validate-login/:identifier", userController.validateLogin); // verify user's login attempt was success or not

router.post("/google-auth", verifyGoogleIdToken, userController.googleAuth);
router.post("/register", userController.registerUser);
router.post("/forgot-password", userController.forgetPassword);

router.get("/credit", validateToken, userController.availableCredits);
router.post("/credit/:plan", validateToken, userController.purchaseCredits);

module.exports = router;
