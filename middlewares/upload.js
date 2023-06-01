const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
	cloud_name: "decr7kali",
	api_key: "125231842612853",
	api_secret: "tCXdKU4zYwLC6_43xg4ZnuY0Y80",
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	folder: "avatars",
	allowedFormats: ["jpg", "png"],
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const uploadCloud = multer({storage});

module.exports = uploadCloud;
