const { Op } = require("sequelize");
const User = require("../models/userModel");
const UserService = require("../services/userServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const genratedOTP = require("../services/otpGenration");
const mailTemplateGenrator = require("../services/emailTemplateGenrator");
const { constants, templates, tokens } = require("../utils");
const sendEmail = require("../services/sendEmailService");
const Profile = require("../models/userProfileModel");
const Transaction = require("../models/transactionsModel");

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
  allUsers,
  getUser,
  availableCredits,
  purchaseCredits,
};
