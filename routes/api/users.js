const express = require("express");

const {
  register,
  login,
  current,
  logout,
} = require("../../controllers/usersControllers");
const { userValidation } = require("../../middlewares/userValidation");
const { authentificate } = require("../../middlewares/authentificate");

const router = express.Router();

router.post("/register", userValidation, register);
router.post("/login", userValidation, login);
router.get("/current", authentificate, current);
router.get("/logout", authentificate, logout);

module.exports = router;
