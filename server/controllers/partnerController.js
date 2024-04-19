const { Op } = require("sequelize");
const Partner = require("../models/partnerModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const genratedOTP = require("../services/otpGenration");
const sendEmail = require("../services/sendEmailService");
const mailTemplateGenrator = require("../services/emailTemplateGenrator");
const { constants, templates, tokens } = require("../utils/");

//register
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

// login
const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  const email_mobile = identifier;

  if (!email_mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const partner = await Partner.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (!partner) {
    res.status(400);
    throw new Error("Partner doesn't exists");
  }

  if (partner && (await bcrypt.compare(password, partner.password))) {
    const loginSecret = genratedOTP;

    partner.otp = loginSecret;

    const otpChanged = await partner.save();
    if (!otpChanged) {
      res.status(500);
      throw new Error("OTP sending failed");
    }

    const loginLink = `${constants.PARTNER_URL}login/${loginSecret}`;
    console.log("ate avvo ke ni");

    const introMsg =
      "You have received this email because a login request for your account was received.";
    const instuctMsg = "Click the button below to login to your account:";
    const link = loginLink;
    const msg = "Login to your account";
    const outro =
      "If you did not request a login, no further action is required on your part.";

    let mail = mailTemplateGenrator(
      partner.name,
      introMsg,
      instuctMsg,
      link,
      msg,
      outro,
      "#3457dc"
    );

    // sending an email ...
    let message = {
      from: constants.MAIL_FROM,
      to: partner.email,
      subject: "Login to fitness networking account",
      html: mail,
    };

    console.log("befor rmail");

    await sendEmail(message);

    console.log("after akil");
    res.status(200).json({ msg: "verification pending" });

    return;
  } else {
    res.status(401);
    throw new Error("email | mobile or password is not valid");
  }
});

//sign in using google
const googleAuth = asyncHandler(async (req, res, next) => {
  const email = req.email;

  const user = await Partner.findOne({
    where: { email },
  });

  if (!user) {
    res.status(400);
    throw new Error("Partner doesn't exists");
  }

  const accessToken = tokens.generateAccessToken(user.gym_id);
  const refreshToken = tokens.generateRefreshToken(user.gym_id);

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      maxAge: 100000,
      httpOnly: true,
      secure: false,
    })
    .json({ accessToken });
  return;
});

// partner verification after login
const checkUserVerificationStatus = asyncHandler(async (req, res) => {
  const io = req.app.get("io");
  const partner = req.user;

  const accessToken = tokens.generateAccessToken(partner.user_id);
  const refreshToken = tokens.generateRefreshToken(partner.user_id);

  io.emit("userVerified", {
    role: "partner",
    accessToken,
    message: "Partner verification successful",
  });

  res
    .cookie("refreshToken", refreshToken, {
      maxAge: 100000,
      httpOnly: true,
      secure: false,
    })
    .status(200)
    .send(templates.verifiedUserTemplate);
  return;
});

// get all partners details
const allPartners = asyncHandler(async (req, res, next) => {
  const currentUser = req.user;
  const partners = await Partner.findAll();
  res.status(201).json({ currentUser, partners });
  return;
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

// after reset-pass/:token
const setPassword = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    console.log("User doesn't exist");
    res
      .status(401)
      .redirect(`${constants.CLIENT_ERROR_URL}?msg=USER%20NOT%20EXISTS`);
  }

  res.redirect(`${constants.CLIENT_URL}login`);
  return;
});

module.exports = {
  register,
  login,
  checkUserVerificationStatus,
  googleAuth,
  allPartners,
  getPartner,
  forgetPassword,
  resetPassword,
  setPassword,
};
