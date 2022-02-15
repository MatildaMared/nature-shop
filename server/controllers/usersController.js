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

		await user.populate("orders");

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

async function getSingleUser(req, res, next) {
	try {
		const id = req.userId;

		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		await user.populate("orders");

		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(err);
	}
}

async function updateUser(req, res, next) {
	try {
		const id = req.params.id;

		if (id.toString() !== req.userId.toString()) {
			return next(new ErrorResponse("Unauthorized", 401));
		}

		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;

		if (req.body.address) {
			user.address = { ...user.address, ...req.body.address };
		}

		const updatedUser = await user.save();

		res.status(200).json({
			success: true,
			user: updatedUser,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteUser(req, res, next) {
	try {
		const id = req.params.id;

		if (id.toString() !== req.userId.toString()) {
			return next(new ErrorResponse("Unauthorized", 401));
		}

		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		await User.findByIdAndRemove(id);

		res.status(200).json({
			success: true,
			message: "User deleted",
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	createUser,
	getSingleUser,
	updateUser,
	deleteUser,
	loginUser,
};
