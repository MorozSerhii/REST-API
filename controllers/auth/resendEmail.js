const User = require("../../models/users");

const { RequestError, sendEmail } = require("../../utils");
require("dotenv").config();
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const verificationToken = user.verificationToken;
  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const emailData = {
    to: email,
    subject: "Email verification",
    html: `</h3><a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click this to verify your email or copy link: ${BASE_URL}/users/verify/${verificationToken} </a>`,
  };
  await sendEmail(emailData);
  res.json({
    message: "Verification email send",
  });
};

module.exports = resendEmail;
