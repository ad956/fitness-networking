const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const accessToken = jwt.sign(
    {
      user,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  return accessToken;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    {
      user,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
