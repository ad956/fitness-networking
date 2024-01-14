const asyncHandler = require("express-async-handler");
const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel")(sequelize, DataTypes);

const validatePasswordToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { otp: token } });

  if (!user) {
    res.status(401);
    throw new Error("Token expired or isn't valid");
  }
});

module.exports = validatePasswordToken;
