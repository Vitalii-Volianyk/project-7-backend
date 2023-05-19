const express = require("express");

const {
  putContactValidation,
  postContactValidation,
  patchContactValidation,
} = require("../../middlewares/validationMiddleware");
const {
  getController,
  getByCategoryController,
  deleteController,
  postController,
  putController,
  patchController,
} = require("../../controllers/getControllers");
const { isValidId } = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", getController);

router.get("/:category", getByCategoryController);

router.post("/", postContactValidation, postController);

router.delete("/:contactId", isValidId, deleteController, deleteController);

router.put("/:contactId", isValidId, putContactValidation, putController);

router.patch(
  "/:contactId/favorite",
  isValidId,
  patchContactValidation,
  patchController
);

module.exports = router;
