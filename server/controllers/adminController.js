const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const Admin = require("../models/adminModel")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const genratedOTP = require("../services/otpGenration");

const register = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !password || !mobile) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const adminAvailable = await Admin.findOne({
    where: {
      email,
    },
  });

  if (adminAvailable) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, bcryptRounds);

  const newAdmin = await Admin.create({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  if (newAdmin) {
    res.status(201).json({ newAdmin });
    return;
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
});

const login = asyncHandler(async (req, res) => {
  res.json({ msg: "ADMIN" });
  return;
});

const getAdmin = asyncHandler(async (req, res) => {
  const admin = req.user;

  res.json({ msg: admin });
  return;
});

module.exports = {
  register,
  login,
  getAdmin,
};
