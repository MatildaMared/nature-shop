const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utilities/errorResponse");

async function tokenHandler(req, res, next) {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return next(new ErrorResponse("Please provide a token", 401));
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decoded.id;

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = tokenHandler;
