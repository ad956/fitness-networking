const { Op } = require("sequelize");
const Admin = require("../models/admin.modal");
const User = require("../models/user.modal");
const Profile = require("../models/user-profile.modal");
const { sendEmail, templateGenrator } = require("../services/email/");
const { constants, genratedOTP, tokens } = require("../utils");
const Status = require("../models/status.modal");
const Partner = require("../models/partner.modal");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !password || !mobile) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const adminAvailable = await Admin.findOne({
    where: {
      email,
    },
  });

  if (adminAvailable) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, bcryptRounds);

  const newAdmin = await Admin.create({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  if (newAdmin) {
    res.status(201).json({ newAdmin });
    return;
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email_mobile, password } = req.body;

  if (!email_mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const admin = await Admin.findOne({
    where: { [Op.or]: [{ email: email_mobile }, { mobile: email_mobile }] },
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = generateAccessToken(admin.admin_id);

    res.status(200).json({ accessToken });
    return;
  } else {
    res.status(401);
    throw new Error("email | mobile or password is not valid");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const userAdmin = req.user;

  const admin = await Admin.findOne({ where: { admin_id: userAdmin.id } });

  if (!admin) {
    res.status(400).json({ msg: "Admin doesn't exists" });
    return;
  }

  res.json({ msg: admin });
  return;
});

// get all users (gym members)
const getUsers = asyncHandler(async (req, res) => {
  const admin = req.user;
  if (!admin) {
    res.status(401).json({ msg: "Only Admins are allowed" });
    return;
  }

  const users = await User.findAll({
    attributes: {
      exclude: ["password", "otp"],
    },
    include: [
      {
        model: Profile,
        attributes: [
          "credit_balance",
          "total_spent",
          "current_gym_name",
          "requested_gym_name",
        ],
      },
      {
        model: Status,
        attributes: ["status", "role"],
      },
    ],
  });

  if (!users) {
    res.json(400);
    throw new Error("Error Fetching Users");
  }

  res.status(200).json(users);
  return;
});

// get all partners (gym owners)
const getPartners = asyncHandler(async (req, res) => {
  const admin = req.user;

  if (!admin) {
    res.status(401).json({ msg: "Only Admins are allowed" });
    return;
  }

  const partners = await Partner.findAll({
    attributes: {
      exclude: ["password", "otp"],
    },
  });

  if (!partners) {
    res.json(400);
    throw new Error("Error Fetching Gym Partners");
  }

  res.status(200).json(partners);
  return;
});

// contact us form from fitness networking landing page

const contactUsForm = asyncHandler(async (req, res) => {
  const formData = req.body;

  const msg = `
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
      <td colspan="2" style="color: #666; font-size: 14px; text-align: center;">
        This email is a notification about a new contact inquiry received through the Fitness Networking website. Please review the details provided and respond to the inquiry as soon as possible.
      </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center; padding-top: 20px;">
      <button style="background-color: #3457dc; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
      <a href="mailto:${formData.email}" style="text-decoration: none; color: #fff;">Respond to Inquiry</a>
    </button>
    
      </td>
    </tr>
  </table>
`;

  let message = {
    from: constants.MAIL_FROM,
    to: process.env.FITNESS_NETWORKING_EMAIL,
    subject: "New Contact Inquiry from Fitness Networking",
    html: msg,
  };

  const sent = await sendEmail(message);

  if (!sent) {
    res.status(400);
    throw new Error("ERROR SENDING MESSAGE");
  }
  res.status(200).json({ msg: "sent" });
  return;
});

module.exports = {
  register,
  login,
  getAdmin,
  getUsers,
  getPartners,
  contactUsForm,
};
