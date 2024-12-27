const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { sendEmail, templateGenrator } = require("../services/email/");
const { constants, genratedOTP, tokens } = require("../utils/");

class AuthService {
  constructor() {
    this.models = {
      admin: require("../models/admin.modal"),
      partner: require("../models/partner.modal"),
      user: require("../models/user.modal"),
    };

    this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;
    this.emailService = sendEmail;
    this.templateGenerator = templateGenrator;
  }

  getModel(userType) {
    const model = this.models[userType.toLowerCase()];
    if (!model) {
      throw new Error("Invalid user type");
    }
    return model;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, this.bcryptRounds);
  }

  async register(userData, userType) {
    const Model = this.getModel(userType);
    const { name, email, password, mobile } = userData;

    const userExists = await Model.findOne({
      where: { [Op.or]: [{ email }, { mobile }] },
    });

    if (userExists) {
      throw new Error(`${userType} already exists`);
    }

    const hashedPassword = await this.hashPassword(password);

    return Model.create({
      name,
      password: hashedPassword,
      email,
      mobile,
    });
  }

  async validateCredentials(user, password) {
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }

  async login(identifier, password, userType) {
    const Model = this.getModel(userType);
    const user = await Model.findOne({
      where: { [Op.or]: [{ email: identifier }, { mobile: identifier }] },
    });

    if (!user) {
      throw new Error(`${userType} doesn't exist`);
    }

    const isPasswordValid = await this.validateCredentials(user, password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const verificationSecret = genratedOTP();
    user.otp = verificationSecret;
    await user.save();

    await this.sendLoginVerificationEmail(user, verificationSecret, userType);

    return user;
  }

  async verifyUserToken(token, userType) {
    const Model = this.getModel(userType);
    const user = await Model.findOne({ where: { otp: token } });

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    user.otp = null;
    await user.save();

    return user;
  }

  async sendLoginVerificationEmail(user, verificationSecret, userType) {
    const verificationLink = `${constants.USER_URL}${userType}/verify/${verificationSecret}`;

    const mail = this.templateGenerator(
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

    return this.emailService(message);
  }

  generateAuthTokens(userId, userType) {
    return {
      accessToken: tokens.generateAccessToken(userId, userType),
      refreshToken: tokens.generateRefreshToken(userId, userType),
    };
  }
}

module.exports = new AuthService();
