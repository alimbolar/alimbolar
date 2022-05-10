const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const mailConfig = {
  host: process.env.MAILGUN_HOST,
  port: process.env.MAILGUN_PORT,
  secure: true,
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(success);
    console.log("Server ready to send mail");
  }
});

exports.sendContactUsMessage = (req, res, next) => {
  const { name, email, mobile, message, subject, recipient } = req.body;

  mailOptions = {
    from: email,
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(400).json({
        status: "fail",
        message: "Could not send email. Please try later",
      });
    } else {
      console.log("email sent");
      res.status(200).json({
        status: "success",
        message:
          "Email sent successfully. \n We will get back to you soon. \n We look forward to hosting you at our home.",
      });
    }
  });
};
