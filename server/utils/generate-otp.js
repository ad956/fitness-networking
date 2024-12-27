const crypto = require("crypto");

const buffer = crypto.randomBytes(5);
const genratedOTP = buffer
  .toString("base64")
  .replace(/[+/=]/g, "")
  .substring(0, 5);

module.exports = genratedOTP;
