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
  mailOptions = {
    from: "testing@gmail.com",
    to: "alimbolar@gmail.com",
    subject: "Testing Email",
    text: "Email sent again successfully with process.env!!",
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(400).json({
        status: "fail",
        message: "Could not send email",
      });
    } else {
      console.log("email sent");
      res.status(200).json({
        status: "success",
        message: "Email sent successfully",
      });
    }
  });
};
