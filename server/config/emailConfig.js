const nodemailer = require("nodemailer");

let config = {
  service: "gmail",
  auth: {
    user: process.env.GUSER,
    pass: process.env.GPASS,
  },
};

let transporter = nodemailer.createTransport(config);
module.exports = { transporter };
