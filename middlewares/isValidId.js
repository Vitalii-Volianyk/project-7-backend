const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { petId } = req.params;

  if (!isValidObjectId(petId)) {
    next(res.json(400, { message: `${petId} is not valid id` }));
  }

  next();
};

module.exports = { isValidId };
