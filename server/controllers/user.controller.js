const userService = require("../services/user.service");
const asyncHandler = require("express-async-handler");
const { constants } = require("../utils");

class UserController {
  constructor() {
    this.userService = userService;
  }

  allUsers = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    const users = await this.userService.getAllUsers();
    res.status(200).json({ currentUser, users });
  });

  getUser = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    const user = await this.userService.getUserById(currentUser.id);

    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    res.status(200).json({ user });
  });

  availableCredits = asyncHandler(async (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .redirect(`${constants.CLIENT_ERROR_URL}?msg=UNAUTHORISED%20USER`);
    }

    res.redirect(`${constants.CLIENT_URL}credit`);
  });

  purchaseCredits = asyncHandler(async (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .redirect(`${constants.CLIENT_ERROR_URL}?msg=UNAUTHORISED%20USER`);
    }

    try {
      const transaction = await this.userService.processCreditsPurchase(
        req.user.id,
        req.params.plan
      );

      res.status(201).json({
        msg: "Transaction Success",
        transactionId: transaction.transaction_id,
      });
    } catch (error) {
      if (error.message === "Invalid purchase plan") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Transaction failed" });
    }
  });
}

module.exports = new UserController(userService);
