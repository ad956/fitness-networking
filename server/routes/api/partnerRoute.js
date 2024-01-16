const express = require("express");
const router = express.Router();

const partnerController = require("../../controllers/partnerController");
const validateToken = require("../../middleware/validateTokenHandler");

router.get("/", validateToken, partnerController.getPartner);
router.post("/login", partnerController.login);
router.post("/register", partnerController.register);
router.get("/all", validateToken, userController.allUsers);
router.post("/forgot-password", userController.forgetPassword); // at login
router.post("/reset-password", validateToken, userController.resetPassword); // using profile
router.get(
  "/reset-password/:token",
  validatePasswordToken,
  userController.setPassword
);
module.exports = router;
