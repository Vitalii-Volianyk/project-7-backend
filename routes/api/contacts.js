const express = require("express");

const {
  getController,
  getByCategoryController,
} = require("../../controllers/getControllers");

const router = express.Router();

router.get("/", getController);

router.get("/:category", getByCategoryController);

module.exports = router;
