// sab api lkhni h as a prototype ke kei kate veni chaije..

const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//register
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({
    where: { [Op.or]: [{ email: email }, { mobile: mobile }] },
  });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = User.create({
    name,
    password: hashedPassword,
    email,
    mobile,
  });

  if (newUser) {
    res.status(201).json({ newUser }); // newUser for now will change it
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// login

const login = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email_mobile, password } = req.body;

  if (!email_mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.user_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email / mobile or password is not valid");
  }
});

//
const allUsers = asyncHandler(async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findAll();
  res.status(201).json({ currentUser, user });
});

// get particular user data
const getUser = asyncHandler(async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({ where: { user_id: currentUser.id } });

  res.status(201).json({ user });
});

module.exports = { login, registerUser, allUsers, getUser };
