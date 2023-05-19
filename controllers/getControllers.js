const { Contact } = require("../models/contacts");

const { controlWrapper } = require("../helpers/controlWrapper");

const getController = async (req, res, next) => {
  const contacts = await Contact.find();

  // для пошуку нам потрібно req.query(пагінація)

  res.json(contacts);
};

const getByCategoryController = async (req, res, next) => {
  const { category } = req.params;
  const findContact = await Contact.find({ category });

  if (findContact.length === 0) {
    return res.json(404, { message: "Not Found" });
  }
  res.json(200, findContact);
};

const postController = async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  res.json(201, newContact);
};

const deleteController = async (req, res, next) => {
  const { contactId } = req.params;

  const deleteContact = await Contact.findByIdAndDelete(contactId);

  if (!deleteContact) {
    return res.json(404, { message: "Not found" });
  }

  res.json(200, { message: "contact deleted" });
};

const putController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phone, email } = req.body;

  const replaceContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { name, phone, email },
    },
    { new: true }
  );

  if (!replaceContact) {
    return res.json(404, { message: "Not found" });
  }

  res.json(200, replaceContact);
};

const patchController = async (req, res, next) => {
  const { contactId } = req.params;

  const replaceContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!replaceContact) {
    return res.json(404, { message: "Not found" });
  }

  res.json(200, replaceContact);
};

module.exports = {
  getController: controlWrapper(getController),
  getByCategoryController: controlWrapper(getByCategoryController),
  postController: controlWrapper(postController),
  deleteController: controlWrapper(deleteController),
  putController: controlWrapper(putController),
  patchController: controlWrapper(patchController),
};
