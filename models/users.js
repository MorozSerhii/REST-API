const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../utils");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);
module.exports = User;
