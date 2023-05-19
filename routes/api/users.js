const express = require("express");

const { register, login } = require("../../controllers/usersControllers");
const { userValidation } = require("../../middlewares/userValidation");

const router = express.Router();

router.post("/register", userValidation, register);
router.post("/login", userValidation, login);

module.exports = router;
