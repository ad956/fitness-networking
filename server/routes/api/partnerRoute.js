const express = require("express");
const router = express.Router();

const partnerController = require("../../controllers/partnerController");
const validateToken = require("../../middleware/validateTokenHandler");
const validatePasswordToken = require("../../middleware/passwordTokenHandler");
const verifyGoogleIdToken = require("../../middleware/verifyGoogleIdToken");

router.get("/", validateToken, partnerController.getPartner);
router.get("/all", validateToken, partnerController.allPartners);
router.post("/login", partnerController.login);
router.get(
  "/login/:token",
  validatePasswordToken,
  partnerController.checkUserVerificationStatus
);
router.post("/google-auth", verifyGoogleIdToken, partnerController.googleAuth);
router.post("/register", partnerController.register);
router.post("/forgot-password", partnerController.forgetPassword); // at login
router.post("/reset-password", validateToken, partnerController.resetPassword); // using profile
router.get(
  "/reset-password/:token",
  validatePasswordToken,
  partnerController.setPassword
);
module.exports = router;
