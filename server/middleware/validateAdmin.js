const User = require("../models/userModel");
const ErrorResponse = require("../utilities/errorResponse");

async function validateAdmin(req, res, next) {
	try {
		const user = await User.findById(req.userId);

		if (!user || user.role !== "admin") {
			return next(new ErrorResponse(`Unauthorized`, 401));
		}

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = validateAdmin;
