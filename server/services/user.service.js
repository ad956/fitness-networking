const db = require("../models/");
const { Profile, Transaction, User } = db;

const { sendEmail, templateGenrator } = require("../services/email/");
const { constants } = require("../utils/constants");
const HttpError = require("../errors/http-error");

class UserService {
  // Credit plans configuration
  creditPlans = {
    300: 1500.0,
    900: 3000.0,
    1800: 5000.0,
    3600: 8000.0,
    4200: 12000.0,
    5000: 15000.0,
  };

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(userId) {
    return await User.findOne({
      where: { user_id: userId },
    });
  }

  async getUserProfile(userId) {
    return await User.findOne({
      where: { user_id: userId },
      attributes: ["name", "email", "mobile"],
      include: {
        model: Profile,
        attributes: ["user_id", "credit_balance"],
      },
    });
  }

  validatePurchasePlan(planId) {
    return this.creditPlans.hasOwnProperty(planId);
  }

  calculateUpdatedCredits(currentBalance, purchaseAmount) {
    return parseFloat(currentBalance) + parseFloat(purchaseAmount);
  }

  async processCreditsPurchase(userId, planId) {
    const user = await this.getUserProfile(userId);
    if (!user) {
      throw HttpError.notFound("User not found");
    }

    if (!this.validatePurchasePlan(planId)) {
      throw HttpError.badRequest("Invalid purchase plan");
    }

    const creditPointsToBeAdded = parseFloat(planId);
    const currentCreditPoints = parseFloat(user.Profile.credit_balance);
    const updatedCreditPoints = this.calculateUpdatedCredits(
      currentCreditPoints,
      creditPointsToBeAdded
    );

    const transactionData = {
      userID: { id: userId },
      user,
      amountValue: this.creditPlans[planId],
      creditPointsToBeAdded,
      currentCreditPoints,
      updatedCreditPoints,
    };

    return await this.purchaseCreditsTransaction(transactionData);
  }

  async purchaseCreditsTransaction(transactionData) {
    const {
      userID,
      user,
      amountValue,
      creditPointsToBeAdded,
      updatedCreditPoints,
    } = transactionData;

    // Update user's credit balance
    await user.Profile.update(
      { credit_balance: updatedCreditPoints },
      { where: { user_id: userID.id } }
    );

    // Create transaction record
    const saveTransaction = await Transaction.create({
      user_id: userID.id,
      transaction_type: "Purchase",
      transaction_amount: amountValue,
      credits: creditPointsToBeAdded,
    });

    await this.sendTransactionEmail(
      user,
      saveTransaction.toJSON(),
      amountValue,
      creditPointsToBeAdded,
      updatedCreditPoints
    );

    return saveTransaction;
  }

  async sendTransactionEmail(
    user,
    savedTransaction,
    amountValue,
    creditPointsToBeAdded,
    updatedCreditPoints
  ) {
    const emailTemplate = this.generateTransactionEmailTemplate(
      user,
      savedTransaction,
      amountValue,
      creditPointsToBeAdded,
      updatedCreditPoints
    );

    const message = {
      from: constants.MAIL_FROM,
      to: user.email,
      subject: "Recent Transaction",
      html: emailTemplate,
    };

    return await sendEmail(message);
  }

  generateTransactionEmailTemplate(
    user,
    transaction,
    amountValue,
    creditPointsToBeAdded,
    updatedCreditPoints
  ) {
    const introMsg =
      "Thank you for your recent transaction. This email confirms the success of your transaction.";
    const instuctMsg = "Details of the transaction:";
    const link = "";
    const msg = `<table style='border-collapse: collapse;border-color:white; width: 100%;pointer-events: none;'>
      <tr style='border: 1px solid black;'>
        <td style='border: 1px solid black; padding: 8px;'>Transaction Id</td>
        <td style='border: 1px solid black; padding: 8px;'>${
          `8JhRt` + transaction.transaction_id
        }</td>
      </tr>
      <tr style='border: 1px solid black;'>
        <td style='border: 1px solid black; padding: 8px;'>Transaction Type</td>
        <td style='border: 1px solid black; padding: 8px;'>Purchase</td>
      </tr>
      <tr style='border: 1px solid black;'>
        <td style='border: 1px solid black; padding: 8px;'>Transaction Amount</td>
        <td style='border: 1px solid black; padding: 8px;'>${amountValue}</td>
      </tr>
      <tr style='border: 1px solid black;'>
        <td style='border: 1px solid black; padding: 8px;'>Newly Added</td>
        <td style='border: 1px solid black; padding: 8px;'>${creditPointsToBeAdded}</td>
      </tr>
      <tr style='border: 1px solid black;'>
        <td style='border: 1px solid black; padding: 8px;'>Total Credits</td>
        <td style='border: 1px solid black; padding: 8px;'>${updatedCreditPoints}</td>
      </tr>
    </table>`;
    const outro =
      "If you have any questions or concerns about this transaction, please contact our customer support.";

    return mailTemplateGenrator(
      user.name,
      introMsg,
      instuctMsg,
      link,
      msg,
      outro,
      "#000"
    );
  }
}

module.exports = new UserService();
