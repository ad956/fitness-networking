const asyncHandler = require("express-async-handler");
const { auth } = require("../services/firebase");

const verifyGoogleIdToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    const decodedToken = await auth.verifyIdToken(token).catch((error) => {
      console.error(error);
      res.status(401);
      throw new Error("Error verifying token");
    });

    if (decodedToken.error) {
      res.status(500);
      throw new Error(decodedToken.error);
    }
    req.email = decodedToken.email;
    next();
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized User or token is not provided");
  }
});

module.exports = verifyGoogleIdToken;
