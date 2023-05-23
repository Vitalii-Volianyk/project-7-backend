const express = require("express");
const router = express.Router();

const { authentificate } = require("../../middlewares/authentificate");

const { validateBody } = require("../../helpers/validatebody");

const { schemas } = require("../../models/pets");

const {
  getController,
  getByIdController,
  getByCategoryController,
} = require("../../controllers/petsControllers");

router.get("/", getController);
router.get("/notice/:noticeId", getByIdController);
router.get("/category/:category", getByCategoryController);

module.exports = router;
