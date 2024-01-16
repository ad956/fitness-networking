const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const Partner = require("../models/partnerModel")(sequelize, DataTypes);
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

  const partnerAvailable = await Partner.findOne({
    where: {
      email,
    },
  });

  if (partnerAvailable) {
    res.status(400);
    throw new Error("Partner already exists");
  }

  const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, bcryptRounds);

  const newPartner = await Partner.create({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  if (newPartner) {
    res.status(201).json({ newPartner });
    return;
  } else {
    res.status(400);
    throw new Error("Partner data is not valid");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email_mobile, password } = req.body;

  if (!email_mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const Partner = await Partner.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (Partner && (await bcrypt.compare(password, Partner.password))) {
    const accessToken = jwt.sign(
      {
        Partner: {
          id: Partner.Partner_id,
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

const getPartner = asyncHandler(async (req, res) => {
  const userPartner = req.user;

  const Partner = await Partner.findOne({
    where: { Partner_id: userPartner.id },
  });

  if (!Partner) {
    res.status(400).json({ msg: "User doesn't exists" });
    return;
  }

  res.json({ msg: Partner });
  return;
});

module.exports = {
  register,
  login,
  getPartner,
};
