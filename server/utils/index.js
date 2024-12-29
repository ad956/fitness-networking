const constants = require("./constants");
const { verifiedUserTemplate } = require("./custom_templates");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./generate-tokens");
const genratedOTP = require("./generate-otp");

module.exports = {
  isProduction: process.env.NODE_ENV === "production",
  ...constants,
  templates: {
    verifiedUserTemplate,
  },
  genratedOTP,
  tokens: {
    generateAccessToken,
    generateRefreshToken,
  },
};
