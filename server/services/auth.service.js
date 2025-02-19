const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const db = require("../models/");
const { Admin, Partner, User } = db;
const HttpError = require("../errors/http-error");

const { sendEmail, templateGenrator } = require("../services/email/");
const { constants, genratedOTP, tokens } = require("../utils/");

class AuthService {
  constructor() {
    this.getModel = this.getModel.bind(this);
  }

  getModel(userType) {
    switch (userType.toLowerCase()) {
      case "admin":
        return Admin;
      case "partner":
        return Partner;
      case "user":
        return User;
      default:
        throw HttpError.badRequest("Invalid user type");
    }
  }

  async register(userData, userType) {
    const Model = this.getModel(userType);
    const { name, email, password, mobile } = userData;

    const userExists = await Model.findOne({
      where: { [Op.or]: [{ email }, { mobile }] },
    });

    if (userExists) {
      throw HttpError.badRequest(`${userType} already exists`);
    }

    const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, bcryptRounds);

    return Model.create({
      name,
      password: hashedPassword,
      email,
      mobile,
    });
  }

  async login(identifier, password, userType) {
    const Model = this.getModel(userType);

    const user = await Model.findOne({
      where: { [Op.or]: [{ email: identifier }, { mobile: identifier }] },
    });

    if (!user) {
      throw HttpError.notFound(`${userType} doesn't exist`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw HttpError.unauthorized("Invalid credentials. Please try again.");
    }

    const verificationSecret = genratedOTP;
    user.otp = verificationSecret;
    await user.save();

    await this.sendLoginVerificationEmail(user, verificationSecret, userType);

    return user;
  }

  async demoLogin(userType) {
    const Model = this.getModel(userType);

    const demo_userId = `${userType}_id`;

    const user = await Model.findOne({
      where: { [demo_userId]: 3 },
    });

    if (!user) {
      throw HttpError.notFound(`${userType} doesn't exist`);
    }

    const primaryKey = user.constructor.primaryKeyAttribute; // Get the primary key field dynamically
    const userId = user[primaryKey]; // Access the primary key value dynamically

    const { accessToken, refreshToken } = this.generateAuthTokens({
      id: userId,
      role: userType,
    });

    return {
      user: {
        id: userId,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        profile: user.profile_photo,
        role: userType,
        accessToken,
      },
      refreshToken,
    };
  }

  // performs email login-link verification
  async verifyUserToken(token, userType) {
    const Model = this.getModel(userType);
    const user = await Model.findOne({ where: { otp: token } });

    if (!user) {
      return null;
    }

    user.otp = null;
    await user.save();

    return user;
  }

  // checks if login attempt is success or not
  async validateLogin({ identifier, userType }) {
    const Model = this.getModel(userType);
    const user = await Model.findOne({
      where: { [Op.or]: [{ email: identifier }, { mobile: identifier }] },
    });

    if (!user) {
      throw HttpError.notFound(`${userType} doesn't exist`);
    }

    const verified = user.otp === null;

    if (!verified) {
      // if the user is not verified
      return { verified };
    }

    const primaryKey = user.constructor.primaryKeyAttribute; // Get the primary key field dynamically
    const userId = user[primaryKey]; // Access the primary key value dynamically

    const { accessToken, refreshToken } = this.generateAuthTokens({
      id: userId,
      role: userType,
    });

    return {
      user: {
        id: userId,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        profile: user.profile_photo,
        role: userType,
        accessToken,
      },
      refreshToken,
      verified,
    };
  }

  async googleAuth(email, userType) {
    const Model = this.getModel(userType);
    const user = await Model.findOne({
      where: { email },
    });

    if (!user) {
      throw HttpError.notFound(`${userType} not found. Please sign up.`);
    }

    const primaryKey = user.constructor.primaryKeyAttribute; // Get the primary key field dynamically
    const userId = user[primaryKey]; // Access the primary key value dynamically

    const { accessToken, refreshToken } = this.generateAuthTokens({
      id: userId,
      role: userType,
    });

    return { accessToken, refreshToken };
  }

  async forgotPassword(identifier, userType) {
    const Model = this.getModel(userType);
    const user = await Model.findOne({
      where: { [Op.or]: [{ email: identifier }, { mobile: identifier }] },
    });

    if (!user) {
      throw HttpError.notFound(`${userType} doesn't exist`);
    }

    const forgotPasswordSecret = genratedOTP;
    user.otp = forgotPasswordSecret;
    await user.save();

    await this.sendForgotPasswordEmail(user, forgotPasswordSecret, userType);

    return true;
  }

  generateAuthTokens(user) {
    return {
      accessToken: tokens.generateAccessToken(user),
      refreshToken: tokens.generateRefreshToken(user),
    };
  }

  async sendLoginVerificationEmail(user, verificationSecret, userType) {
    const verificationLink = `${constants.AUTH_URL}verify?token=${verificationSecret}&role=${userType}`;

    const mail = templateGenrator(
      user.name,
      `You have received this email because a login request for your ${userType} account was received.`,
      "Click the button below to login to your account:",
      verificationLink,
      "Login to your account",
      "If you did not request a login, no further action is required on your part.",
      "#3457dc"
    );

    const message = {
      from: constants.MAIL_FROM,
      to: user.email,
      subject: `Login to fitness networking ${userType} account`,
      html: mail,
    };

    return sendEmail(message);
  }

  async sendForgotPasswordEmail(user, forgotPasswordSecret, userType) {
    const forgotPasswordLink = `${constants.USER_URL}${userType}/reset-password/${forgotPasswordSecret}`;

    const mail = templateGenrator(
      user.name,
      `You have received this email because a forgot password request for your ${userType} account was received.`,
      "Click the button below to reset your password:",
      forgotPasswordLink,
      "Reset your password",
      "If you did not request a password reset, no further action is required on your part.",
      "#3457dc"
    );

    const message = {
      from: constants.MAIL_FROM,
      to: user.email,
      subject: `Reset Password for ${userType} Account`,
      html: mail,
    };

    return sendEmail(message);
  }
}

module.exports = new AuthService();
