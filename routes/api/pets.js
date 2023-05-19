const express = require("express");

const {
  getController,
  getByCategoryController,
} = require("../../controllers/petsControllers");

const router = express.Router();

router.get("/", getController);

router.get("/:category", getByCategoryController);

module.exports = router;
