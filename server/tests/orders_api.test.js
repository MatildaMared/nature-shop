const supertest = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../index");
const api = supertest(app);
const {
	dummyProduct,
	dummyProducts,
	dummyAdmin,
	dummyUser,
} = require("./dummyData");
const { connectToDB, disconnectFromDB } = require("../database");
const Product = require("../models/productModel");
const User = require("../models/userModel");

describe("Orders API", () => {
	let token = "";
	let userId = "";
	let productId = "";

	beforeAll(async () => {
		connectToDB();

		// Creating dummy user
		const user = await User.create(dummyUser);
		token = user.getToken();
		userId = user._id;

		// Creating dummy product
		const product = await Product.create(dummyProduct);
		productId = product._id;
	});

	// ###
	// ### Create new order
	// ###

	describe("Creating a new order", () => {
		it("succeeds provided all necessary information", async () => {
			const dummyOrder = {
				products: [
					{
						posterId: productId,
						amount: 1,
						title: "Title",
						price: 100,
						frame: "white",
						passerPartout: false,
					},
				],
			};

			const response = await api
				.post("/api/orders")
				.set("Authorization", `Bearer ${token}`)
				.send(dummyOrder)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			expect(response.body.user.orders[0].totalPrice).toBe(100);
			expect(response.body.order.products[0].title).toBe("Title");
		});

		it("fails with status code 401 if token is not provided", async () => {
			const dummyOrder = {
				products: [
					{
						posterId: productId,
						amount: 1,
						title: "Title",
						price: 100,
						frame: "white",
						passerPartout: false,
					},
				],
			};

			const response = await api
				.post("/api/orders")
				.send(dummyOrder)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const dummyOrder = {
				products: [
					{
						posterId: productId,
						amount: 1,
						title: "Title",
						price: 100,
						frame: "white",
						passerPartout: false,
					},
				],
			};

			const invalidToken = "invalid123";

			const response = await api
				.post("/api/orders")
				.set("Authorization", `Bearer ${invalidToken}`)
				.send(dummyOrder)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid token");
    });
	});

	afterAll(() => {
		disconnectFromDB();
	});
});
