const asyncHandler = require("express-async-handler");
const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel")(sequelize, DataTypes);

const validatePasswordToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { otp: token } });

  if (!user) {
    console.log("Token expired or isn't valid");
    res
      .status(401)
      .redirect(
        "http://localhost:5173/err?msg=RESET%20TOKEN%20IS%20NOT%20VALID"
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
