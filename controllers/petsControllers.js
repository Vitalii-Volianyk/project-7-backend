const { Pet } = require("../models/pets");

const { controlWrapper } = require("../helpers/controlWrapper");

const getController = async (req, res, next) => {
  const { title, category } = req.query;

  if (title) {
    const pets = await Pet.find({ title: { $regex: title, $options: "i" } });
    return res.json(200, pets);
  }

  if (category) {
    const pets = await Pet.find({
      category: { $regex: category, $options: "i" },
    });
    return res.json(200, pets);
  }

  const pets = await Pet.find();

  res.json(200, pets);
};

const getByIdController = async (req, res, next) => {
  const { noticeId } = req.params;

  const findNotice = await Pet.findById(noticeId);

  if (!findNotice) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findNotice);
};

const getByCategoryController = async (req, res, next) => {
  const { category } = req.params;
  const findPet = await Pet.find({ category });

  if (findPet.length === 0) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findPet);
};

const addPets = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Pet.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deletePetsId = async (req, res) => {
  const { petId } = req.params;
  console.log(petId);
  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getController: controlWrapper(getController),
  getByCategoryController: controlWrapper(getByCategoryController),
  addPets: controlWrapper(addPets),
  deletePetsId: controlWrapper(deletePetsId),
  getByIdController: controlWrapper(getByIdController),
};
