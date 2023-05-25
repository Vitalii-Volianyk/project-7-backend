const express = require("express");
const router = express.Router();

const {
  getController,
  getByIdController,
  getByCategoryController,
  getBySearchController,
  patchByIdController,
  addNoticeController,
  getFavoritesController,
} = require("../../controllers/noticesControllers");
const { authentificate } = require("../../middlewares/authentificate");
const { validateBody } = require("../../helpers/validatebody");
const { schemas } = require("../../models/notices");
const { isValidId } = require("../../middlewares/isValidId");

router.get("/", getController);
router.get("/notice/:noticeId", getByIdController);
router.get("/search/:category", getBySearchController);
router.get("/category/:category", getByCategoryController);
router.patch(
  "/favorite/:noticeId",
  isValidId,
  authentificate,
  patchByIdController
);
router.get("/favorites", authentificate, getFavoritesController);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema),
  addNoticeController
);

module.exports = router;
