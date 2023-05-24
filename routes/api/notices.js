const express = require("express");
const router = express.Router();

const {
  getController,
  getByIdController,
  getByCategoryController,
  getBySearchController,
} = require("../../controllers/noticesControllers");

router.get("/", getController);
router.get("/notice/:noticeId", getByIdController);
router.get("/:category", getBySearchController);
router.get("/category/:category", getByCategoryController);

module.exports = router;
