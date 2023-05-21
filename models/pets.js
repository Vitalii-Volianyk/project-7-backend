const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
      enum: ["sell", "lostFound", "in good hands"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
    },
    breed: {
      type: String,
    },
    price: {
      type: String,
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Pet = model("pet", petSchema);

module.exports = {
  petSchema,
  Pet,
};
