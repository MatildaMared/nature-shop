const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, "Please enter an email"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please enter a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minLength: [5, "Password must be at least 5 characters"],
	},
	address: {
		street: {
			type: String,
			required: [true, "Please enter a street address"],
		},
		city: {
			type: String,
			required: [true, "Please enter a city"],
		},
		postalCode: {
			type: String,
			required: [true, "Please enter a postal code"],
		},
	},
	cart: {
		type: Array,
	},
	orders: {
		type: Array,
	},
});

userSchema.pre("save", async function (next) {
	const saltRounds = 10;

	if (!this.isModified("password")) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, saltRounds);
	next();
});

userSchema.methods.comparePassword = function (enteredPassword, userPassword) {
	return bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.getToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	},
});

module.exports = User;
