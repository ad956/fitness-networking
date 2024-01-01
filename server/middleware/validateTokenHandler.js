const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization; // check for it A vs a

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized User");
      }
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized User or token is not provided");
  }
});

module.exports = validateToken;
