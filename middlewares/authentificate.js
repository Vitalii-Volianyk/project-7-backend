const jwt = require("jsonwebtoken");
const {User} = require("../models/users");
const {HttpError} = require("../helpers/HttpError");

const authentificate = async (req, res, next) => {
	const {authorization = ""} = req.headers;
	const [bearer, token] = authorization.split(" ");

	if (bearer !== "Bearer") {
		next(HttpError(401, "Not authorized"));
	}

	try {
		const {id} = jwt.verify(token, "sgdfssdgsgsggsgdgsgsggdsgs");
		const user = await User.findById(id);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, "Not authorized"));
		}

		req.user = user;

		next();
	} catch (error) {
		next(HttpError(401, "Not authorized"));
	}
};

module.exports = {
	authentificate,
};
