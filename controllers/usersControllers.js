const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {User} = require("../models/users");

const {controlWrapper} = require("../helpers/controlWrapper");
const {HttpError} = require("../helpers/HttpError");

const register = async (req, res, next) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		email,
		password: hashedPassword,
	});

	const payload = {
		id: newUser._id,
	};

	const token = jwt.sign(payload, "sgdfssdgsgsggsgdgsgsggdsgs", {
		expiresIn: "23h",
	});

	const updateUser = await User.findByIdAndUpdate(newUser._id, {token});

	res.status(201).json({
		message: "success",
		user: {
			email: updateUser.email,
			name: updateUser.name,
			phone: updateUser.phone,
			birthday: updateUser.birthday,
			city: updateUser.city,
			id: updateUser._id,
		},
		token,
	});
};

const login = async (req, res, next) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});

	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, "sgdfssdgsgsggsgdgsgsggdsgs", {
		expiresIn: "23h",
	});

	const updateUser = await User.findByIdAndUpdate(
		user._id,
		{token},
		{new: true}
	);
	console.log(updateUser);
	res.status(201).json({
		message: "success",
		user: {
			email: updateUser.email,
			name: updateUser.name,
			phone: updateUser.phone,
			birthday: updateUser.birthday,
			city: updateUser.city,
			id: updateUser._id,
			avatarURL: updateUser.avatarURL,
		},
		token,
	});
};

const current = (req, res, next) => {
	const {_id: id, name, email, birthday, phone, city, avatarURL} = req.user;
	const userData = {
		user: {id, name, email, birthday, phone, city, avatarURL},
	};
	res.json(200, userData);
};

const logout = async (req, res, next) => {
	const {_id} = req.user;

	await User.findByIdAndUpdate(_id, {token: ""});

	res.json(204, {message: "Logout sucess"});
};

const changeData = async (req, res, next) => {
	const {_id} = req.user;
	const {name, email, birthday, phone, city} = req.body;
	const data = {name, email, birthday, phone, city};

	const userData = await User.findByIdAndUpdate(
		_id,
		{
			$set: data,
		},
		{new: true}
	).select([
		"email",
		"name",
		"phone",
		"birthday",
		"city",
		"_id",
		"avatarURL",
	]);

	res.json(201, {user: userData});
};

const updateAvatar = async (req, res) => {
	const {_id} = req.user;
	const {path: avatarURL} = req.file;

	const newAvatar = await User.findByIdAndUpdate(
		_id,
		{avatarURL},
		{new: true}
	);
	res.json(201, {user: newAvatar});
};

const deleteAvatar = async (req, res) => {
	const {_id} = req.user;

	const newAvatar = await User.findByIdAndUpdate(
		_id,
		{avatarURL: ""},
		{new: true}
	);
	res.json(201, {user: newAvatar});
};

module.exports = {
	register: controlWrapper(register),
	login: controlWrapper(login),
	current: controlWrapper(current),
	logout: controlWrapper(logout),
	changeData: controlWrapper(changeData),
	updateAvatar: controlWrapper(updateAvatar),
	deleteAvatar: controlWrapper(deleteAvatar),
};
