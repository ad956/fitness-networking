const asyncHandler = require("express-async-handler");

const validatePasswordToken = asyncHandler(async (req, res, next) => {
  const token = req.params;
  console.log(token);
});

module.exports = validatePasswordToken;
