const asyncHandler = require("express-async-handler");
const { constants } = require("../utils/constants");
const User = require("../models/userModel");
const Partner = require("../models/partnerModel");

const validatePasswordToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const user = req.originalUrl.includes("user")
    ? await User.findOne({ where: { otp: token } })
    : await Partner.findOne({ where: { otp: token } });

  if (!user) {
    res
      .status(401)
      .redirect(
        `${constants.CLIENT_ERROR_URL}?msg=RESET%20TOKEN%20IS%20NOT%20VALID%20OR%20EXPIRED`
      );

    return;
  }

  user.otp = null;
  const result = await user.save();
  if (!result) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
  req.user = user;
  next();
});

module.exports = validatePasswordToken;
