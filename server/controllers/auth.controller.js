const authService = require("../services/auth.service");
const asyncHandler = require("express-async-handler");
const { constants } = require("../utils");

class AuthController {
  constructor(authService) {
    this.authService = authService;
    this.cookieOptions = {
      maxAge: constants.COOKIE_MAX_AGE_MS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };
  }

  validateRequestBody(fields, body) {
    const missingFields = fields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
  }

  setCookies(res, { accessToken, refreshToken }) {
    res.cookie("refreshToken", refreshToken, this.cookieOptions);
    res.cookie("accessToken", accessToken, this.cookieOptions);
  }

  clearCookies(res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }

  register = asyncHandler(async (req, res) => {
    this.validateRequestBody(["name", "email", "password", "mobile"], req.body);

    const { name, email, password, mobile } = req.body;
    const userType = req.path.split("/")[1]; // Extracts user type from URL

    const newUser = await this.authService.register(
      {
        name,
        email,
        password,
        mobile,
      },
      userType
    );

    res.status(201).json({ newUser });
  });

  login = asyncHandler(async (req, res) => {
    this.validateRequestBody(["identifier", "password"], req.body);

    const { identifier, password } = req.body;
    const userType = req.path.split("/")[1];

    await this.authService.login(identifier, password, userType);
    res.status(200).json({ msg: "verification pending" });
  });

  logout = asyncHandler(async (req, res) => {
    this.clearCookies(res);
    res.status(200).json({ message: "Logged out successfully" });
  });

  verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const userType = req.path.split("/")[1];

    const user = await this.authService.verifyUserToken(token, userType);
    if (!user) {
      return res
        .status(401)
        .redirect(
          `${constants.CLIENT_ERROR_URL}?msg=TOKEN%20IS%20NOT%20VALID%20OR%20EXPIRED`
        );
    }

    const tokens = this.authService.generateAuthTokens(user.id, userType);
    this.setCookies(res, tokens);

    res.status(200).send(templates.verifiedUserTemplate);
  });

  googleAuth = asyncHandler(async (req, res) => {
    const { email } = req;
    const userType = req.path.split("/")[1];

    const user = await this.authService.googleAuth(email, userType);
    const tokens = this.authService.generateAuthTokens(user.user_id, userType);

    this.setCookies(res, tokens);
    res.status(200).json({ accessToken: tokens.accessToken });
  });
}

module.exports = new AuthController(authService);
