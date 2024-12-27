const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  const accessToken = jwt.sign(
    {
      user: {
        id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  return accessToken;
}

function generateRefreshToken(id) {
  const refreshToken = jwt.sign(
    {
      user: {
        id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
