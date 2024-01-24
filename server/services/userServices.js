const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionsModel");

const purchaseCreditsTransaction = asyncHandler(async (transactionData) => {
  const {
    userID,
    user,
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
    gym_id: null,
    transaction_type: transactionType,
    transaction_amount: amountValue,
    credit_purchased: creditPointsToBeAdded,
  });

  return saveTransaction;
});

module.exports = { purchaseCreditsTransaction };
