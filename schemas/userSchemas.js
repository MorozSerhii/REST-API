const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const subscriptions = ["starter", "pro", "business"];

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  verifyEmailSchema,
  registerSchema,
  loginSchema,
  updateSubscriptionJoiSchema,
};

module.exports = schemas;
