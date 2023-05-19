const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
    },
  },
  { versionKey: false }
);

const Pet = model("pet", petSchema);

module.exports = {
  petSchema,
  Pet,
};
