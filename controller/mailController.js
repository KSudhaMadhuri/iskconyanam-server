const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = sendMail;
