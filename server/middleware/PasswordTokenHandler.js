const asyncHandler = require("express-async-handler");
const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel")(sequelize, DataTypes);

const validatePasswordToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { otp: token } });

  if (!user) {
    res.status(401).redirect("http://localhost:5173/err");
    throw new Error("Token expired or isn't valid");
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
