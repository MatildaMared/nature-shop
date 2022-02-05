const mongoose = require("mongoose");
const ErrorResponse = require("../utilities/errorResponse");
const Product = require("../models/productsModel");
const { rawListeners } = require("../models/productsModel");

async function createProduct(req, res, next) {
	try {
		if (
			req.body.price &&
			(typeof req.body.price !== "number" || req.body.price < 0)
		) {
			return next(new ErrorResponse("Please provide a valid price", 400));
		} else if (
			req.body.inStock &&
			(typeof req.body.inStock !== "number" || req.body.inStock < 0)
		) {
			return next(new ErrorResponse("Please provide a valid quantity", 400));
		} else if (req.body.title && typeof req.body.title !== "string") {
			return next(new ErrorResponse("Please provide a valid title", 400));
		} else if (
			req.body.description &&
			typeof req.body.description !== "string"
		) {
			return next(new ErrorResponse("Please provide a valid description", 400));
		} else if (req.body.imageUrl && typeof req.body.imageUrl !== "string") {
			return next(new ErrorResponse("Please provide a valid image URL", 400));
		}

		const product = {
			title: req.body.title,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			price: req.body.price,
			inStock: req.body.inStock,
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

async function getProductById(req, res, next) {}

async function updateProduct(req, res, next) {}

async function deleteProduct(req, res, next) {}

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
