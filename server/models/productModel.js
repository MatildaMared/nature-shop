const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	title: {
		type: String,
		required: [true, "Please provide a title"],
	},
	category: {
		type: String,
		required: [true, "Please provide a category"],
		lowercase: true,
	},
	description: {
		type: String,
		required: [true, "Please provide a description"],
	},
	imageUrl: {
		type: String,
		required: [true, "Please provide an image URL"],
	},
	price: {
		type: Number,
		required: [true, "Please provide a price"],
	},
	inStock: {
		type: Number,
		required: [true, "Please provide a quantity"],
	},
});

productSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
