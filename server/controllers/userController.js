const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = require("../models/userModel");
const UserService = require("../services/userServices");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const genratedOTP = require("../services/otpGenration");
const mailTemplateGenrator = require("../services/emailTemplateGenrator");
const { constants } = require("../utils/constants");
const sendEmail = require("../services/sendEmailService");
const Profile = require("../models/userProfileModel");
const Transaction = require("../models/transactionsModel");

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
  const { identifier, password } = req.body;
  const email_mobile = identifier;

  if (!email_mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exists");
  }

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

    const loginSecret = genratedOTP;

    user.otp = loginSecret;

    const otpChanged = await user.save();
    if (!otpChanged) {
      res.status(500);
      throw new Error("OTP sending failed");
    }

    const loginLink = `${constants.USER_URL}login/${loginSecret}`;

    const introMsg =
      "You have received this email because a login request for your account was received.";
    const instuctMsg = "Click the button below to login to your account:";
    const link = loginLink;
    const msg = "Login to your account";
    const outro =
      "If you did not request a login, no further action is required on your part.";

    let mail = mailTemplateGenrator(
      user.name,
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
      to: user.email,
      subject: "Login to fitness networking account",
      html: mail,
    };

    await sendEmail(message);

    res.status(200).json({ accessToken });
    return;
  } else {
    res.status(401);
    throw new Error("email / mobile or password is not valid");
  }
});

const googleAuth = asyncHandler(async (req, res, next) => {
  const email = req.email;
  console.log("EMAIL : " + email);
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exists");
  }

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
});

// redirect the user after login/:token validation
const checkUserVerificationStatus = asyncHandler(async (req, res) => {
  const io = req.app.get("io");
  const email = req.user.email;
  const mobile = req.user.mobile;
  io.emit("emailVerified", {
    email,
    mobile,
    message: "Email verification successful",
  });

  res.status(200).send(`
    <html>
      <head>
        <title>Email Verification Successful</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            padding-top: 50px;
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <h1>Email Verification Successful</h1>
        <p>Your email has been successfully verified. You can now close this tab.</p>
      </body>
    </html>
  `);

  return;
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
    outro,
    "#3457dc"
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
    outro,
    "#3457dc"
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
      attributes: ["user_id", "credit_balance"],
    },
  });

  const creditPointsToBeAdded = parseFloat(purchasePlanID);
  const currentCreditPoints = parseFloat(user.Profile.credit_balance); //user_id for now than profile.cr_points
  const updatedCreditPoints = currentCreditPoints + creditPointsToBeAdded;

  // purchase logic
  switch (purchasePlanID) {
    case "300":
      {
        const transactionData = {
          userID,
          user,
          amountValue: 1500.0,
          creditPointsToBeAdded,
          currentCreditPoints,
          updatedCreditPoints,
        };

        const saveTransaction =
          UserService.purchaseCreditsTransaction(transactionData);

        // send mail about success(with last and new credits)/failure transactions
        if (!saveTransaction) {
          res.status(500).json({ error: "Transaction failed" });
        } else {
          res.status(201).json({ msg: "Transaction Success" });
        }
      }
      break;

    case "900":
      {
        const transactionData = {
          userID,
          user,
          amountValue: 3000.0,
          creditPointsToBeAdded,
          currentCreditPoints,
          updatedCreditPoints,
        };

        const saveTransaction =
          UserService.purchaseCreditsTransaction(transactionData);

        // send mail about success(with last and new credits)/failure transactions
        if (!saveTransaction) {
          res.status(500).json({ error: "Transaction failed" });
        } else {
          res.status(201).json({ msg: "Transaction Success" });
        }
      }
      break;
    case "1800":
      {
        const transactionData = {
          userID,
          user,
          amountValue: 5000.0,
          creditPointsToBeAdded,
          currentCreditPoints,
          updatedCreditPoints,
        };

        const saveTransaction =
          UserService.purchaseCreditsTransaction(transactionData);

        // send mail about success(with last and new credits)/failure transactions
        if (!saveTransaction) {
          res.status(500).json({ error: "Transaction failed" });
        } else {
          res.status(201).json({ msg: "Transaction Success" });
        }
      }
      break;

    case "3600":
      {
        const transactionData = {
          userID,
          user,
          amountValue: 8000.0,
          creditPointsToBeAdded,
          currentCreditPoints,
          updatedCreditPoints,
        };

        const saveTransaction =
          UserService.purchaseCreditsTransaction(transactionData);

        // send mail about success(with last and new credits)/failure transactions
        if (!saveTransaction) {
          res.status(500).json({ error: "Transaction failed" });
        } else {
          res.status(201).json({ msg: "Transaction Success" });
        }
      }
      break;

    case "4200":
      {
        const transactionData = {
          userID,
          user,
          amountValue: 12000.0,
          creditPointsToBeAdded,
          currentCreditPoints,
          updatedCreditPoints,
        };

        const saveTransaction =
          UserService.purchaseCreditsTransaction(transactionData);

        // send mail about success(with last and new credits)/failure transactions
        if (!saveTransaction) {
          res.status(500).json({ error: "Transaction failed" });
        } else {
          res.status(201).json({ msg: "Transaction Success" });
        }
      }
      break;

    case "5000":
      {
        const transactionData = {
          userID,
          user,
          amountValue: 15000.0,
          creditPointsToBeAdded,
          updatedCreditPoints,
        };

        const saveTransaction =
          UserService.purchaseCreditsTransaction(transactionData);

        // send mail about success( with last and new credits)/failure transactions
        if (!saveTransaction) {
          res.status(500).json({ error: "Transaction failed" });
        } else {
          res.status(201).json({ msg: "Transaction Success" });
        }
      }
      break;

    default:
      res.status(404).send("Invalid Purchase Plan Selected");
  }

  return;
});

module.exports = {
  login,
  googleAuth,
  checkUserVerificationStatus,
  registerUser,
  allUsers,
  getUser,
  resetPassword,
  forgetPassword,
  setPassword,
  availableCredits,
  purchaseCredits,
};
