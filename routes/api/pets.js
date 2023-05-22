const express = require("express");

const {
  getController,
  getByIdController,
  getByCategoryController,
} = require("../../controllers/petsControllers");

const router = express.Router();

router.get("/", getController);
router.get("/:noticeId", getByIdController);
router.get("/:category", getByCategoryController);

module.exports = router;
