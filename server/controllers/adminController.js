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
  const { email_mobile, password } = req.body;

  if (!email_mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const admin = await Admin.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          id: admin.admin_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({ accessToken });
    return;
  } else {
    res.status(401);
    throw new Error("email | mobile or password is not valid");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const userAdmin = req.user;

  const admin = await Admin.findOne({ where: { admin_id: userAdmin.id } });

  if (!admin) {
    res.status(400).json({ msg: "User doesn't exists" });
    return;
  }

  res.json({ msg: admin });
  return;
});

const getUsers = asyncHandler(async (req, res) => {});

module.exports = {
  register,
  login,
  getAdmin,
};
