const mongoose = require("mongoose");
const ErrorResponse = require("../utilities/errorResponse");
const Product = require("../models/productsModel");

async function createProduct(req, res, next) {
	try {
		const product = {
			title: req.body.title,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			price: req.body.price,
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

async function getProducts(req, res, next) {}

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
