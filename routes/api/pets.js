const express = require("express");
const router = express.Router();

const {authentificate} = require("../../middlewares/authentificate");

const {validateBody} = require("../../helpers/validateBody");

const {schemas} = require("../../models/pets");

const {isValidId} = require("../../middlewares/isValidId");

//const ctrl = require("../../controllers/petsControllers");

const {
	getPet,
	addPet,
	deletePetsId,
} = require("../../controllers/petsControllers");
const uploadCloud = require("../../middlewares/upload");

router.get("/", authentificate, getPet);

router.delete("/:petId", isValidId, authentificate, deletePetsId);

router.post(
	"/",
	authentificate,
	uploadCloud.single("pets-photo"),
	validateBody(schemas.addSchema),
	addPet
);

module.exports = router;
