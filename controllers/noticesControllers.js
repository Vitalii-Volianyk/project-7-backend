const { Notices } = require("../models/notices");

const { controlWrapper } = require("../helpers/controlWrapper");
const { HttpError } = require("../helpers/HttpError");

const getController = async (req, res, next) => {
  const { title, category } = req.query;

  if (title) {
    const notices = await Notices.find({
      title: { $regex: title, $options: "i" },
    });
    return res.json(200, notices);
  }

  if (category) {
    const notices = await Notices.find({
      category: { $regex: category, $options: "i" },
    });
    return res.json(200, notices);
  }

  const notices = await Notices.find();

  res.json(200, notices);
};

const getByIdController = async (req, res, next) => {
  const { noticeId } = req.params;

  const findNotice = await Notices.findById(noticeId);

  if (!findNotice) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findNotice);
};

const getByCategoryController = async (req, res, next) => {
  const { category } = req.params;
  const findNotices = await Notices.find({ category });

  if (findNotices.length === 0) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findNotices);
};

module.exports = {
  getController: controlWrapper(getController),
  getByCategoryController: controlWrapper(getByCategoryController),
  getByIdController: controlWrapper(getByIdController),
};
