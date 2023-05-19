const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
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

const Contact = model("contacts", contactSchema);

module.exports = {
  contactSchema,
  Contact,
};
