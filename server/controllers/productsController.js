const mongoose = require("mongoose");
const ErrorResponse = require("../utilities/errorResponse");
const Product = require("../models/productModel");
const User = require("../models/userModel");

async function createProduct(req, res, next) {
	try {
		const { title, description, category, imageUrl, price, inStock } = req.body;

		if (price && (typeof price !== "number" || price < 0)) {
			return next(new ErrorResponse("Please provide a valid price", 400));
		} else if (inStock && (typeof inStock !== "number" || inStock < 0)) {
			return next(new ErrorResponse("Please provide a valid quantity", 400));
		} else if (title && typeof title !== "string") {
			return next(new ErrorResponse("Please provide a valid title", 400));
		} else if (description && typeof description !== "string") {
			return next(new ErrorResponse("Please provide a valid description", 400));
		} else if (imageUrl && typeof imageUrl !== "string") {
			return next(new ErrorResponse("Please provide a valid image URL", 400));
		} else if (category && typeof category !== "string") {
			return next(new ErrorResponse("Please provide a valid category", 400));
		}

		const product = {
			title,
			description,
			category,
			imageUrl,
			price,
			inStock,
		};

		const newProduct = await Product.create(product);

		res.status(201).json({
			success: true,
			product: newProduct,
		});
	} catch (err) {
		next(err);
	}
}

async function getProducts(req, res, next) {
	try {
		const products = await Product.find();

		res.status(200).json({
			success: true,
			products,
		});
	} catch (err) {
		next(err);
	}
}

async function getProductById(req, res, next) {
	try {
		const id = req.params.id;

		const product = await Product.findById(id);

		if (!product) {
			return next(new ErrorResponse(`Product not found`, 404));
		}

		res.status(200).json({
			success: true,
			product,
		});
	} catch (err) {
		next(err);
	}
}

async function updateProduct(req, res, next) {
	try {
		const id = req.params.id;

		const product = await Product.findById(id);

		if (!product) {
			return next(new ErrorResponse(`Product not found`, 404));
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				title: req.body.title,
				description: req.body.description,
				category: req.body.category,
				imageUrl: req.body.imageUrl,
				price: req.body.price,
				inStock: req.body.inStock,
			},
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			success: true,
			product: updatedProduct,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteProduct(req, res, next) {
	try {
		const id = req.params.id;

		const product = await Product.findById(id);

		if (!product) {
			return next(new ErrorResponse(`Product not found`, 404));
		}

		await Product.findByIdAndDelete(id);

		const products = await Product.find();

		res.status(200).json({
			success: true,
			message: "Product deleted",
			products,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
