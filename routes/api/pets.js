const express = require("express");
const router = express.Router();

const { authentificate } = require("../../middlewares/authentificate");

const { validateBody } = require("../../helpers/validateBody");

const { schemas } = require("../../models/pets");

const { isValidId } = require("../../middlewares/isValidId");

//const ctrl = require("../../controllers/petsControllers");

const {
  getPet,
  addPet,
  deletePetsId,
} = require("../../controllers/petsControllers");
const uploadCloud = require("../../middlewares/upload");

router.get("/", authentificate, getPet);

router.delete("/:petId", authentificate, isValidId, deletePetsId);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema),
  uploadCloud.single("image"),
  addPet
);

module.exports = router;
