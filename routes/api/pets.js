const express = require("express");
const router = express.Router();

const { authentificate } = require("../../middlewares/authentificate");

const { validateBody } = require("../../helpers/validatebody");

const { schemas } = require("../../models/pets");

//const ctrl = require("../../controllers/petsControllers");

const {
  getController,
  getByIdController,
  getByCategoryController,
  addPets,
  deletePetsId,
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

router.get("/:noticeId", getByIdController);
router.get("/:category", getByCategoryController);

module.exports = router;
