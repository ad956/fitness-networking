const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionsModel");

const purchaseCreditsTransaction = asyncHandler(async (transactionData) => {
  const {
    userID,
    user,
    amountValue,
    creditPointsToBeAdded,
    currentCreditPoints,
    updatedCreditPoints,
  } = transactionData;

  // Update user's credit balance
  await user.Profile.update(
    { credit_balance: updatedCreditPoints },
    { where: { user_id: userID } }
  );

  // Create a transaction :
  // add amount used to transactions
  const saveTransaction = await Transaction.create({
    user_id: userID.id,
    transaction_type: "Purchase",
    transaction_amount: amountValue,
    credits: creditPointsToBeAdded,
  });

  // Return success indicator
  return saveTransaction;
});

module.exports = { purchaseCreditsTransaction };
