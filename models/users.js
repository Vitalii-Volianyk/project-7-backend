const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String },
    birthday: { type: String },
    phone: { type: String },
    city: { type: String },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  birthday: Joi.string(),
  phone: Joi.string().alphanum(),
  city: Joi.string(),
});

const User = model("users", userSchema);

const schemas = { addSchema };

module.exports = {
  userSchema,
  User,
  schemas,
};
