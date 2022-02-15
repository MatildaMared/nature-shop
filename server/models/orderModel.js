const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Please provide a user ID"],
	},
	products: [
		{
			posterId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: [true, "Please provide a poster ID"],
			},
			amount: {
				type: Number,
				required: [true, "Please provide an amount"],
			},
			title: String,
			price: Number,
			frame: String,
			passerPartout: Boolean,
		},
	],
	totalPrice: {
		type: Number,
		required: [true, "Please provide a total price"],
	},
});

orderSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
