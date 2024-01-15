const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const genratedOTP = require("../services/otpGenration");

const login = asyncHandler(async (req, res) => {
  res.json({ msg: "ADMIN" });
});
const admin = asyncHandler(async (req, res) => {
  res.json({ msg: "ADMIN" });
});

module.exports = {
  login,
  admin,
};
