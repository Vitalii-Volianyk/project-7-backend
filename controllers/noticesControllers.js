const { Pet } = require("../models/pets");

const { controlWrapper } = require("../helpers/controlWrapper");
const { HttpError } = require("../helpers/HttpError");

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
  const findNotices = await Pet.find({ category });

  if (findNotices.length === 0) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findNotices);
};

const getBySearchController = async (req, res, next) => {
  const { category } = req.params;
  const { title } = req.query;

  const findPet = await Pet.find({
    category: { $regex: category, $options: "i" },
    title: { $regex: title, $options: "i" },
  });
  res.json(200, findPet);
};

module.exports = {
  getController: controlWrapper(getController),
  getByCategoryController: controlWrapper(getByCategoryController),
  getBySearchController: controlWrapper(getBySearchController),
  getByIdController: controlWrapper(getByIdController),
};
