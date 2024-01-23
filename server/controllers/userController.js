const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const genratedOTP = require("../services/otpGenration");
const mailTemplateGenrator = require("../services/emailTemplateGenrator");
const { constants } = require("../utils/constants");
const sendEmail = require("../services/sendEmailService");
const Profile = require("../models/userProfileModel");

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

  const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, bcryptRounds);

  const newUser = User.create({
    name,
    password: hashedPassword,
    email,
    mobile,
  });

  if (newUser) {
    res.status(201).json({ newUser }); // newUser for now will change it
    return;
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// login
const login = asyncHandler(async (req, res, next) => {
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
    return;
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
  return;
});

// get particular user data
const getUser = asyncHandler(async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({ where: { user_id: currentUser.id } });

  if (!user) {
    res.status(400).json({ msg: "User doesn't exists" });
    return;
  }

  res.status(201).json({ user });
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

  res.redirect(`${constants.CLIENT_URL}login`); //set password route
  return;
});

const availableCredits = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res
      .status(401)
      .redirect(`${constants.CLIENT_ERROR_URL}?msg=UNAUTHORISED%20USER`);
  }

  res.redirect(`${constants.CLIENT_URL}credit`);
  return;
});

const purchaseCredits = asyncHandler(async (req, res) => {
  const userID = req.user;
  if (!userID) {
    console.log("User isn't authorized");
    res
      .status(401)
      .redirect(`${constants.CLIENT_ERROR_URL}?msg=UNAUTHORISED%20USER`);
  }

  const purchasePlanID = req.params.plan;
  /*
  300 Credit Points -> ₹1500.00
  900 Credit Points -> ₹3000.00
  1800 Credit Points -> ₹5000.00
  3600 Credit Points -> ₹8000.00
  4200 Credit Points -> ₹12000.00
  5000 Credit Points -> ₹15000.00
  */
  const user = await User.findOne({
    where: { user_id: userID.id },
    attributes: ["name", "email", "mobile"],
    include: {
      model: Profile,
      attributes: ["credit_balance"],
    },
  });

  // purchase logic
  switch (purchasePlanID) {
    case "300":
      const creditPointsToBeAdded = parseInt(purchasePlanID);
      const currentCreditPoints = parseInt(user.Profile.credit_balance); //user_id for now than profile.cr_points
      const updatedCreditPoints = currentCreditPoints + creditPointsToBeAdded;
      res.json(updatedCreditPoints);
      return;

      // save updated credit points to user profile

      // add amount used to transactions

      // send mail about success(with last and new credits)/failure transactions

      break;

    case "900":
      res.send("Processed purchase with id 2");
      break;

    case "1800":
      res.send("Processed purchase with id 3");
      break;

    case "3600":
      res.send("Processed purchase with id 4");
      break;

    case "4200":
      res.send("Processed purchase with id 5");
      break;

    case "5000":
      res.send("Processed purchase with id 6");
      break;

    default:
      res.status(404).send("Invalid Purchase Plan Selected");
  }

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
  availableCredits,
  purchaseCredits,
};
