const express = require("express");
const router = express.Router();

const { authentificate } = require("../../middlewares/authentificate");

const { validateBody } = require("../../helpers/validatebody");

const { schemas } = require("../../models/pets");

//const ctrl = require("../../controllers/petsControllers");

const {
  getController,
  getByCategoryController,
  addPets,
} = require("../../controllers/petsControllers");

router.get("/", getController);
// router.get("/:category", getByCategoryController);

// router.post(
//   "/",
//   authenticate,
//   express.json(),
//   validateBody(schemas.addSchema),
//   ctrl.addContact
// );

//router.post("/", addPets);
router.post(
  "/",
  authentificate,
  express.json(),
  validateBody(schemas.addSchema),
  addPets
);

module.exports = router;
