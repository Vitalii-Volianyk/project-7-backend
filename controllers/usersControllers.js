const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { controlWrapper } = require("../helpers/controlWrapper");
const { HttpError } = require("../helpers/HttpError");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  let success = false;
  const findCommonEmail = await User.findOne({ email });

  if (findCommonEmail) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  success = true;

  res.json(201, {
    user: {
      email,
      success,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json(201, {
    message: "success",
    token,
  });
};

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
};
