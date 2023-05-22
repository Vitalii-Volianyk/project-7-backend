const express = require("express");
const router = express.Router();

const { authentificate } = require("../../middlewares/authentificate");
const { isValidId } = require("../../helpers/isValidId");
const { schemas } = require("../../models/pets");

//const ctrl = require("../../controllers/petsControllers");

const {
  getController,
  getByIdController,
  getByCategoryController,
  addPets,
} = require("../../controllers/petsControllers");
const { validateBody } = require("../../helpers/validatebody");

router.get("/", getController);

router.post(
  "/",
  authentificate,
  express.json(),
  validateBody(schemas.addSchema),
  addPets
);

router.get("/:noticeId", isValidId, getByIdController);
router.get("/:category", isValidId, getByCategoryController);

module.exports = router;
