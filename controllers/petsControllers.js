const { Pet } = require("../models/pets");

const { controlWrapper } = require("../helpers/controlWrapper");
const { HttpError } = require("../helpers/HttpError");

const getPet = async (req, res) => {
  const findPet = await Pet.find();

  res.json(200, findPet);
};

const addPets = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Pet.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deletePetsId = async (req, res) => {
  const { petId } = req.params;
  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  addPets: controlWrapper(addPets),
  deletePetsId: controlWrapper(deletePetsId),
  getPet: controlWrapper(getPet),
};
