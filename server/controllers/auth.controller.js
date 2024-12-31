const authService = require("../services/auth.service");
const asyncHandler = require("express-async-handler");
const { constants, isProduction, templates } = require("../utils");

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

  demoLogin = asyncHandler(async (req, res) => {
    const { role } = req.query;

    if (!role) {
      res.status(400);
      throw new Error("Role is mandatory");
    }

    const { accessToken, refreshToken } = await this.authService.demoLogin(
      role
    );
    res
      .cookie("refreshToken", refreshToken, {
        maxAge: constants.COOKIE_MAX_AGE_MS,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      })
      .status(200)
      .json({ accessToken });
  });

  logout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ msg: "Logged out successfully" });
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

    res.status(200).send(templates.verifiedUserTemplate);
  });

  validateLogin = asyncHandler(async (req, res) => {
    const { identifier, role } = req.body;

    if (!identifier || !role) {
      res.status(400);
      throw new Error("Identifier & Role field are mandatory");
    }

    const { accessToken, refreshToken, verified } =
      await this.authService.validateLogin({
        identifier,
        userType: role,
      });

    if (!verified) {
      // if not verified, return only the verification status
      return res.status(200).json({ verified });
    }

    res
      .cookie("refreshToken", refreshToken, {
        maxAge: constants.COOKIE_MAX_AGE_MS,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      })
      .status(200)
      .json({ accessToken, verified });
  });

  googleAuth = asyncHandler(async (req, res) => {
    const { email, role } = req.user; // Set by verifyGoogleIdToken middleware

    const { accessToken, refreshToken } = await this.authService.googleAuth(
      email,
      role
    );

    res
      .cookie("refreshToken", refreshToken, {
        maxAge: constants.COOKIE_MAX_AGE_MS,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
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
