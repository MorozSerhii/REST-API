const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (data) => {
  const mail = { from: "ecprap@gmail.com", ...data };
  sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
