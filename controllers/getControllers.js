const { Pet } = require("../models/pets");

const { controlWrapper } = require("../helpers/controlWrapper");

const getController = async (req, res, next) => {
  const pets = await Pet.find();

  // для пошуку нам потрібно req.query(пагінація)

  res.json(pets);
};

const getByCategoryController = async (req, res, next) => {
  const { category } = req.params;
  const findPet = await Pet.find({ category });

  if (findPet.length === 0) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findPet);
};

module.exports = {
  getController: controlWrapper(getController),
  getByCategoryController: controlWrapper(getByCategoryController),
};
