const express = require("express");
const router = express.Router();

const partnerController = require("../../controllers/partnerController");
const validateToken = require("../../middleware/validateTokenHandler");

router.get("/", validateToken, partnerController.getPartner);
router.post("/login", partnerController.login);
router.post("/register", partnerController.register);

module.exports = router;
