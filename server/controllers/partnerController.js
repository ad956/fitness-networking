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

  const partner = await Partner.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (partner && (await bcrypt.compare(password, partner.password))) {
    const accessToken = jwt.sign(
      {
        Partner: {
          id: Partner.gym_id,
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
  const user = req.user;

  const partner = await Partner.findOne({
    where: { gym_id: user.id },
  });

  if (!partner) {
    res.status(400).json({ msg: "Partner doesn't exists" });
    return;
  }

  res.json({ msg: partner });
  return;
});

//forget-password
const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email_mobile } = req.body;

  if (!email_mobile) {
    res.status(400).json({ msg: "Email or Mobile is mandatory" });
    return;
  }

  const user = await User.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (!user) {
    res.status(400).json({ msg: "User doesn't exists" });
    return;
  }

  const forgotPasswordSecret = genratedOTP;

  user.otp = forgotPasswordSecret;

  const otpChanged = await user.save();
  if (!otpChanged) {
    res.status(500).json({ msg: "OTP sending failed" });
    return;
  }

  const forgotPasswordLink = `${constants.USER_URL}reset-password/${forgotPasswordSecret}`;

  const introMsg =
    "You have received this email because a forgot password request for your account was received.";
  const instuctMsg = "Click the button below to reset your password:";
  const link = forgotPasswordLink;
  const msg = "Reset your password";
  const outro =
    "If you did not request a forgot password reset, no further action is required on your part.";

  let mail = mailTemplateGenrator(
    user.name,
    introMsg,
    instuctMsg,
    link,
    msg,
    outro
  );

  // sending an email ...
  let message = {
    from: constants.MAIL_FROM,
    to: user.email,
    subject: "Reset Password",
    html: mail,
  };

  const info = await sendEmail(message);
  res.status(201).json(info);
  return;
});

//reset-password
const resetPassword = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const result = await User.findOne({ where: { user_id: user.id } });
  const userEmail = result.email;

  const resetToken = genratedOTP;
  //  add otp to user
  result.otp = resetToken;

  const otpChanged = await result.save();
  if (!otpChanged) {
    res.status(500).json({ msg: "OTP sending failed" });
    return;
  }

  // different for production
  const passwordResetLink = `${constants.USER_URL}reset-password/${resetToken}`;

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

  // sending an email ...
  let message = {
    from: constants.MAIL_FROM,
    to: userEmail,
    subject: "Reset Password",
    html: mail,
  };

  const info = await sendEmail(message);
  res.status(201).json(info);
  return;
});

module.exports = {
  register,
  login,
  getPartner,
  forgetPassword,
  resetPassword,
};
