const constants = require("./constants");
const { verifiedUserTemplate } = require("./custom_templates");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./generateTokens");

module.exports = {
  ...constants,
  templates: {
    verifiedUserTemplate,
  },
  tokens: {
    generateAccessToken,
    generateRefreshToken,
  },
};
