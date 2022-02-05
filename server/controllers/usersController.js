const User = require("../models/userModel");
const ErrorResponse = require("../utilities/errorResponse");

async function createUser(req, res, next) {
	try {
		const { name, email, password, address } = req.body;

		if (name && typeof name !== "string") {
			return next(new ErrorResponse("Please enter a valid name", 400));
		}

		const user = await User.create({
			name,
			email,
			password,
			address,
		});

		res.status(201).json({
			success: true,
			user,
			token: user.getToken(),
		});
	} catch (err) {
		next(err);
	}
}

async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;

		if (!email) {
			return next(new ErrorResponse("Please enter an email", 400));
		} else if (!password) {
			return next(new ErrorResponse("Please enter a password", 400));
		}

		const user = await User.findOne({ email });

		if (!user) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}

		const isMatch = await user.comparePassword(password, user.password);

		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}

		res.status(200).json({
			success: true,
			user,
			token: user.getToken(),
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
}

async function getUserById(req, res, next) {}

async function updateUser(req, res, next) {}

async function deleteUser(req, res, next) {}

module.exports = { createUser, getUserById, updateUser, deleteUser, loginUser };