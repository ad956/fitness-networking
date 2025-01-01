const { Op } = require("sequelize");

const db = require("../models/");
const { Admin, Partner, Profile, Status, User } = db;

const { sendEmail } = require("./email/");
const { constants } = require("../utils");
const bcrypt = require("bcrypt");
const HttpError = require("../errors/http-error");

class AdminService {
  constructor() {
    this.adminModel = Admin;
    this.userModel = User;
    this.partnerModel = Partner;
    this.profileModel = Profile;
    this.statusModel = Status;
    this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;
  }

  async registerAdmin(adminData) {
    const { name, email, mobile, password } = adminData;

    const adminExists = await this.adminModel.findOne({
      where: { email },
    });

    if (adminExists) {
      throw HttpError.badRequest("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(password, this.bcryptRounds);

    return await this.adminModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
  }

  async loginAdmin(identifier, password) {
    const admin = await this.adminModel.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { mobile: identifier }],
      },
    });

    if (!admin) {
      throw HttpError.notFound("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw HttpError.unauthorized("Invalid credentials");
    }

    return admin;
  }

  async getAdminById(adminId) {
    return await this.adminModel.findOne({
      where: { admin_id: adminId },
    });
  }

  async getAllUsers() {
    return await this.userModel.findAll({
      attributes: {
        exclude: ["password", "otp"],
      },
      include: [
        {
          model: this.profileModel,
          attributes: [
            "credit_balance",
            "total_spent",
            "current_gym_name",
            "requested_gym_name",
          ],
        },
        {
          model: this.statusModel,
          attributes: ["status", "role"],
        },
      ],
    });
  }

  async getAllPartners() {
    return await this.partnerModel.findAll({
      attributes: {
        exclude: ["password", "otp"],
      },
    });
  }

  async handleContactForm(formData) {
    const emailTemplate = `
    <table style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
      <tr>
        <td colspan="2" style="text-align: center;">
          <h2 style="color: #3457dc; font-size: 24px;">Fitness Networking - New Contact Inquiry</h2>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;"><strong>Name:</strong></td>
        <td style="padding-bottom: 10px;">${formData.name}</td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;"><strong>Email:</strong></td>
        <td style="padding-bottom: 10px;">${formData.email}</td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;"><strong>Message:</strong></td>
        <td style="padding-bottom: 10px;">${formData.message}</td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: center; padding-top: 20px;">
          <button style="background-color: #3457dc; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            <a href="mailto:${formData.email}" style="text-decoration: none; color: #fff;">Respond to Inquiry</a>
          </button>
        </td>
      </tr>
    </table>`;

    const message = {
      from: constants.MAIL_FROM,
      to: process.env.FITNESS_NETWORKING_EMAIL,
      subject: "New Contact Inquiry from Fitness Networking",
      html: emailTemplate,
    };

    return await sendEmail(message);
  }
}

module.exports = new AdminService();
