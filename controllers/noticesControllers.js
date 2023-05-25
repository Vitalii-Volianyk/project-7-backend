const { Notices } = require("../models/notices");

const { controlWrapper } = require("../helpers/controlWrapper");
const { HttpError } = require("../helpers/HttpError");

const getController = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const pets = await Notices.find({}, "", { skip, limit }).select([
    "category",
    "location",
    "age",
    "sex",
  ]);
  res.json(200, pets);
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

const getBySearchController = async (req, res, next) => {
  const { category } = req.params;
  const { title } = req.query;

  const findNotices = await Notices.find({
    category: { $regex: category, $options: "i" },
    title: { $regex: title, $options: "i" },
  });
  res.json(200, findNotices);
};

const patchByIdController = async (req, res, next) => {
  const { _id } = req.user;
  const { noticeId } = req.params;

  const notice = await Notices.findById(noticeId);

  if (notice.favorites.includes(_id)) {
    const findFavorite = await Notices.findByIdAndUpdate(
      noticeId,
      {
        $pull: { favorites: _id },
      },
      {
        new: true,
      }
    ).select("favorites");

    return res.json(200, findFavorite);
  }

  const findFavorite = await Notices.findByIdAndUpdate(
    noticeId,
    {
      $push: { favorites: _id },
    },
    {
      new: true,
    }
  ).select("favorites");

  res.json(200, findFavorite);
};

const getFavoritesController = async (req, res, next) => {
  const { _id } = req.user;

  const noticies = await Notices.find({ favorites: { $in: [_id] } }).select([
    "category",
    "location",
    "age",
    "sex",
  ]);
  res.json(200, noticies);
};

const addNoticeController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Notices.create({ ...req.body, owner });

  res.json(201, newContact);
};

const getMyAdsController = async (req, res, next) => {
  const { _id: owner } = req.user;

  const userAds = await Notices.find({ owner });
  res.json(200, userAds);
};

const deleteNoticeController = async (req, res, next) => {
  const { noticeId } = req.params;
  const deleteNotice = await Notices.findByIdAndDelete(noticeId);

  if (!deleteNotice) {
    throw HttpError(404, "Not Found");
  }

  res.json(200, { message: "notice deleted" });
};

module.exports = {
  getController: controlWrapper(getController),
  getByCategoryController: controlWrapper(getByCategoryController),
  getBySearchController: controlWrapper(getBySearchController),
  getByIdController: controlWrapper(getByIdController),
  patchByIdController: controlWrapper(patchByIdController),
  getFavoritesController: controlWrapper(getFavoritesController),
  addNoticeController: controlWrapper(addNoticeController),
  getMyAdsController: controlWrapper(getMyAdsController),
  deleteNoticeController: controlWrapper(deleteNoticeController),
};
