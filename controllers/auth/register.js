const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");
const { v4 } = require("uuid");
const User = require("../../models/users");

const { BASE_URL } = process.env;
const { RequestError, sendEmail } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `</h3><a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click this to verify your email or copy link: ${BASE_URL}/users/verify/${verificationToken} </a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
