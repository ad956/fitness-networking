// sab api lkhni h as a prototype ke kei kate veni chaije..

const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const resetToken = require("../services/otpGenration");
const mailTemplateGenrator = require("../services/emailTemplateGenrator");
const {
  MAIL_FROM,
  CLIENT_ERROR_URL,
  CLIENT_URL,
} = require("../utils/constants");
const sendEmail = require("../services/sendEmailService");

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

// get all users details
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

//forget-password
const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email_mobile } = req.body;

  if (!email_mobile) {
    res.status(400);
    throw new Error("Email or Mobile is mandatory");
  }

  const user = await User.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exists");
  }

  res.json(user);
});

//reset-password
const resetPassword = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const result = await User.findOne({ where: { user_id: user.id } });
  const userEmail = result.email;

  //  add otp to user
  result.otp = resetToken;

  const otpChanged = await result.save();
  if (!otpChanged) {
    res.status(500);
    throw new Error("OTP sending failed");
  }

  // different for production
  const passwordResetLink = `http://localhost:3000/api/user/reset-password/${resetToken}`;

  const introMsg =
    "You have received this email because a password reset request for your account was received.";
  const instuctMsg = "Click the button below to reset your password:";
  const link = passwordResetLink;
  const msg = "Reset your password";
  const outro =
    "If you did not request a password reset, no further action is required on your part.";

  let mail = mailTemplateGenrator(
    result.name,
    introMsg,
    instuctMsg,
    link,
    msg,
    outro
  );

  // sending an email...
  let message = {
    from: MAIL_FROM,
    to: userEmail,
    subject: "Reset Password",
    html: mail,
  };

  const info = await sendEmail(message);
  res.status(201).json(info);
});

// after reset-pass/:token
const setPassword = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    console.log("User doesn't exist");
    res.status(401).redirect(`${CLIENT_ERROR_URL}?msg=USER%20NOT%20EXISTS`);
  }

  res.redirect(`${CLIENT_URL}login`);
  return;
});

module.exports = {
  login,
  registerUser,
  allUsers,
  getUser,
  resetPassword,
  forgetPassword,
  setPassword,
};
