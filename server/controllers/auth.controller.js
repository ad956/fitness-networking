const authService = require("../services/auth.service");
const asyncHandler = require("express-async-handler");
const { constants, templates } = require("../utils");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = asyncHandler(async (req, res) => {
    const { role, name, email, password, mobile } = req.body;

    if (!role || !name || !email || !password || !mobile) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const newUser = await this.authService.register(
      {
        name,
        email,
        password,
        mobile,
      },
      role
    );
    res.status(201).json({ newUser });
  });

  login = asyncHandler(async (req, res) => {
    const { role, identifier, password } = req.body;

    if (!role || !identifier || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    await this.authService.login(identifier, password, role);
    res.status(200).json({ msg: "verification pending" });
  });

  logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    await this.authService.logout(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  });

  verifyUser = asyncHandler(async (req, res) => {
    const { token, role } = req.query;

    if (!role || !token) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const user = await this.authService.verifyUserToken(token, role);

    if (!user) {
      return res
        .status(401)
        .redirect(
          `${constants.CLIENT_ERROR_URL}?msg=TOKEN%20IS%20NOT%20VALID%20OR%20EXPIRED`
        );
    }

    const primaryKey = user.constructor.primaryKeyAttribute; // Get the primary key field dynamically
    const userId = user[primaryKey]; // Access the primary key value dynamically

    const { accessToken, refreshToken } = this.authService.generateAuthTokens({
      id: userId,
      role: role,
    });

    res
      .cookie("refreshToken", refreshToken, {
        maxAge: constants.COOKIE_MAX_AGE_MS,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .cookie("accessToken", accessToken, {
        maxAge: constants.COOKIE_MAX_AGE_MS,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .send(templates.verifiedUserTemplate);
  });

  validateLogin = asyncHandler(async (req, res) => {
    const { identifier, role } = req.body;

    if (!identifier || !role) {
      res.status(400);
      throw new Error("Identifier & Role field are mandatory");
    }

    const result = await this.authService.validateLogin({
      identifier,
      userType: role,
    });
    res.status(200).json(result);
  });

  googleAuth = asyncHandler(async (req, res) => {
    const { email, role } = req.user; // Set by verifyGoogleIdToken middleware

    const user = await this.authService.googleAuth(email, role);

    const primaryKey = user.constructor.primaryKeyAttribute; // Get the primary key field dynamically
    const userId = user[primaryKey]; // Access the primary key value dynamically

    const { accessToken, refreshToken } = this.authService.generateAuthTokens({
      id: userId,
      role,
    });

    res
      .cookie("refreshToken", refreshToken, {
        maxAge: constants.COOKIE_MAX_AGE_MS,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ accessToken });
  });

  forgotPassword = asyncHandler(async (req, res) => {
    const { email_mobile } = req.body;

    if (!email_mobile) {
      res.status(400);
      throw new Error("Email or Mobile is mandatory");
    }

    await this.authService.forgotPassword(email_mobile);
    res
      .status(200)
      .json({ message: "Password reset instructions sent to your email" });
  });
}

module.exports = new AuthController(authService);
