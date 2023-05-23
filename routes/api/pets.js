const express = require("express");
const router = express.Router();

const { authentificate } = require("../../middlewares/authentificate");

const { validateBody } = require("../../helpers/validatebody");

const { schemas } = require("../../models/pets");

const { isValidId } = require("../../middlewares/isValidId");

//const ctrl = require("../../controllers/petsControllers");

const {
  getController,
  getBySearchController,
  addPets,
  deletePetsId,
} = require("../../controllers/petsControllers");

router.get("/", getController);

router.get("/:category", getBySearchController);

router.post(
  "/",
  authentificate,
  express.json(),
  validateBody(schemas.addSchema),
  addPets
);

router.delete("/:petId", authentificate, isValidId, deletePetsId);

module.exports = router;
