const adminService = require("../services/admin.service");
const asyncHandler = require("express-async-handler");
const { generateAccessToken } = require("../utils/generate-tokens");

class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  register = asyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !password || !mobile) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const newAdmin = await this.adminService.registerAdmin({
      name,
      email,
      mobile,
      password,
    });

    res.status(201).json({ newAdmin });
  });

  login = asyncHandler(async (req, res) => {
    const { email_mobile, password } = req.body;

    if (!email_mobile || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const admin = await this.adminService.loginAdmin(email_mobile, password);
    const accessToken = generateAccessToken(admin.admin_id);

    res.status(200).json({ accessToken });
  });

  getAdmin = asyncHandler(async (req, res) => {
    const admin = await this.adminService.getAdminById(req.user.id);

    if (!admin) {
      return res.status(404).json({ msg: "Admin doesn't exist" });
    }

    res.status(200).json({ msg: admin });
  });

  getUsers = asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Only Admins are allowed" });
    }

    const users = await this.adminService.getAllUsers();
    res.status(200).json(users);
  });

  getPartners = asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Only Admins are allowed" });
    }

    const partners = await this.adminService.getAllPartners();
    res.status(200).json(partners);
  });

  contactUsForm = asyncHandler(async (req, res) => {
    const sent = await this.adminService.handleContactForm(req.body);

    if (!sent) {
      res.status(400);
      throw new Error("ERROR SENDING MESSAGE");
    }

    res.status(200).json({ msg: "sent" });
  });
}

module.exports = new AdminController(adminService);
