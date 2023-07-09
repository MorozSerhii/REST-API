const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSub");
const updateAvatar = require("./updateAvatar");
const verification = require("./verification");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verification,
  resendEmail,
};
