const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
    },
  },
  { versionKey: false }
);

const Pet = model("pet", petSchema);

module.exports = {
  petSchema,
  Pet,
};
