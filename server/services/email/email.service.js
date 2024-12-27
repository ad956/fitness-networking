const { transporter, nodemailer } = require("../../config/emailConfig");

const sendEmail = async (message) => {
  const info = await transporter.sendMail(message);

  return {
    msg: "Email sent",
    info: info.messageId,
    preview: nodemailer.getTestMessageUrl(info),
  };
};

module.exports = sendEmail;
