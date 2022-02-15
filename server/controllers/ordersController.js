const mongoose = require("mongoose");
const ErrorResponse = require("../utilities/errorResponse");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

async function createOrder(req, res, next) {
	try {
		const newOrder = {
			userId: req.userId,
			products: req.body.products,
			totalPrice: req.body.products.reduce((acc, curr) => {
				return acc + curr.price * curr.amount;
			}, 0),
		};

		const user = await User.findById(req.userId);

		if (!user) {
			return next(new ErrorResponse("User not found", 404));
		}

		newOrder.products.forEach(async (item) => {
			const product = await Product.findById(item.posterId);
			product.inStock = product.inStock - item.amount;
			await product.save();
		});

		const order = await Order.create(newOrder);

		user.orders.push(order._id);
		await user.save();
		await user.populate("orders");

		res.status(201).json({
			success: true,
			order,
			user,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createOrder };
