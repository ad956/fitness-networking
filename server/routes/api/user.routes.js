const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user.controller");

router.get("/", userController.getUser);
router.get("/all", userController.allUsers);
router.get("/credit", userController.availableCredits);
router.post("/credit/:plan", userController.purchaseCredits);

module.exports = router;
