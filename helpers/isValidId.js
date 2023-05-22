const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { noticeId } = req.params;

  if (!isValidObjectId(noticeId)) {
    next(res.json(400, { message: `${noticeId} is not valid id` }));
  }

  next();
};

module.exports = { isValidId };
