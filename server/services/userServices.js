const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionsModel");
const mailTemplateGenrator = require("../services/emailTemplateGenrator");
const sendEmail = require("../services/sendEmailService");
const { constants } = require("../utils/constants");

const purchaseCreditsTransaction = asyncHandler(async (transactionData) => {
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
    { where: { user_id: userID } }
  );

  // Create a transaction : add amount used to transactions
  const saveTransaction = await Transaction.create({
    user_id: userID.id,
    transaction_type: "Purchase",
    transaction_amount: amountValue,
    credits: creditPointsToBeAdded,
  });

  const savedTransaction = saveTransaction.toJSON();

  const introMsg =
    "Thank you for your recent transaction. This email confirms the success of your transaction.";
  const instuctMsg = "Details of the transaction:";
  const link = "";
  const msg = `<table style='border-collapse: collapse; width: 100%;'>
  <tr style='border: 1px solid black;'>
    <td style='border: 1px solid black; padding: 8px;'>Transaction Id</td>
    <td style='border: 1px solid black; padding: 8px;'>${
      `8JhRt` + savedTransaction.transaction_id
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
</table>
`;
  const outro =
    "If you have any questions or concerns about this transaction, please contact our customer support.";

  let mail = mailTemplateGenrator(
    user.name,
    introMsg,
    instuctMsg,
    link,
    msg,
    outro,
    "#000"
  );

  // sending an email ...
  let message = {
    from: constants.MAIL_FROM,
    to: user.email,
    subject: "Recent Transaction",
    html: mail,
  };

  const info = await sendEmail(message);

  // Return success indicator
  return info;
});

module.exports = { purchaseCreditsTransaction };
