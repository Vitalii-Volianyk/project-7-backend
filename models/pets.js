const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers/handleMongooseError");

const petSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title"],
    },
    name: {
      type: String,
      required: [true, "Set name"],
    },
    category: {
      type: String,
      enum: ["sell", "lostFound", "in good hands"],
      required: [true, "Set category"],
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: [true, "Set location"],
    },
    age: {
      type: String,
    },
    sex: {
      type: Boolean,
      required: [true, "Set sex"],
    },
    breed: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

petSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  sex: Joi.bool().required(),
  favourite: Joi.bool(),
  location: Joi.string().required(),
  price: Joi.string(),
  comments: Joi.string(),
});

const Pet = model("pet", petSchema);

const schemas = {
  addSchema,
};

module.exports = {
  schemas,
  Pet,
};
