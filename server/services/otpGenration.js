const crypto = require("crypto");

const buffer = crypto.randomBytes(5);
const resetToken = buffer
  .toString("base64")
  .replace(/[+/=]/g, "")
  .substring(0, 5);

module.exports = resetToken;
