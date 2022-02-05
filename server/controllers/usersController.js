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

async function getUserById(req, res, next) {}

async function updateUser(req, res, next) {}

async function deleteUser(req, res, next) {}

module.exports = { createUser, getUserById, updateUser, deleteUser };
