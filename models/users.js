const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: String,
  },
  { versionKey: false }
);

const User = model("users", userSchema);

module.exports = {
  userSchema,
  User,
};
