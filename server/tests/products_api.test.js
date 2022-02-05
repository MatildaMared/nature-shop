const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const api = supertest(app);
const { dummyProduct, dummyProducts } = require("./dummyData");
const { connectToDB, disconnectFromDB } = require("../database");
const Product = require("../models/productsModel");

describe("Products API", () => {
	beforeAll(() => {
		connectToDB();
	});

	afterAll(() => {
		disconnectFromDB();
		server.close();
	});

	// ###
	// ### Creating a new product ###
	// ###

	describe("Creating a new product", () => {
		beforeAll(async () => {
			await Product.deleteMany({});
		});

		it("succeeds provided all necessary data", async () => {
			const res = await api
				.post("/api/products")
				.send(dummyProduct)
				.expect(201);

			expect(res.body.product.title).toBe(dummyProduct.title);
		});

		it("fails with status code 400 if title is missing", async () => {
			const product = {
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: 10,
				inStock: 25,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a title");
		});

		it("fails with status code 400 if title is not of type string", async () => {
			const product = {
				title: 1,
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: 10,
				inStock: 25,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid title");
		});

		it("fails with status code 400 if description is missing", async () => {
			const product = {
				title: "Test product",
				imageUrl: "https://test.com/test.jpg",
				price: 154,
				inStock: 15,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a description");
		});

		it("fails with status code 400 if description is not of type string", async () => {
			const product = {
				title: "Test product",
				description: 1,
				imageUrl: "https://test.com/test.jpg",
				price: 154,
				inStock: 15,
			};

			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid description");
		});

		it("fails with status code 400 if imageUrl is missing", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				price: 199,
				inStock: 49,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide an image URL");
		});

		it("fails with status code 400 if imageUrl is not of type string", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: 1,
				price: 199,
				inStock: 49,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid image URL");
		});

		it("fails with status code 400 if price is missing", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				inStock: 19,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a price");
		});

		it("fails with status code 400 if price is not a number", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: "abc",
				inStock: 19,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid price");
		});

		it("fails with status code 400 if price is less than 0", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: -15,
				inStock: 19,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid price");
		});

		it("fails with status code 400 if inStock is missing", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: 199,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a quantity");
		});

		it("fails with status code 400 if inStock is not a number", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: 199,
				inStock: "abc",
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid quantity");
		});

		it("fails with status code 400 if inStock is less than 0", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: 199,
				inStock: -15,
			};
			const res = await api
				.post("/api/products")
				.send(product)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a valid quantity");
		});
	});

	// ###
	// ### Get all products ###
	// ###

	describe("Get all products", () => {
		beforeAll(async () => {
			await Product.deleteMany({});

			dummyProducts.forEach(async (product) => {
				await Product.create(product);
			});
		});

		it("returns an array of all products", async () => {
			const res = await api
				.get("/api/products")
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.products.length).toBe(dummyProducts.length);
			expect(res.body.products[1].title).toBe(dummyProducts[1].title);
		});

		it("returns an array of all products with correct fields", async () => {
			const res = await api
				.get("/api/products")
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.products[0]).toHaveProperty("id");
			expect(res.body.products[0]).toHaveProperty("title");
			expect(res.body.products[0]).toHaveProperty("description");
			expect(res.body.products[0]).toHaveProperty("imageUrl");
			expect(res.body.products[0]).toHaveProperty("price");
			expect(res.body.products[0]).toHaveProperty("inStock");
		});
	});

	describe("Get single product by id", () => {
		let id;

		beforeAll(async () => {
			await Product.deleteMany({});
			await Product.create(dummyProduct);
			const product = await Product.findOne({ title: dummyProduct.title });
			id = product._id;
		});

		it("returns a single product matching the provided id", async () => {
			const res = await api
				.get(`/api/products/${id}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.product.title).toBe(dummyProducts[0].title);
		});

		it("returns a single product with all correct fields", async () => {
			const res = await api
				.get(`/api/products/${id}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.product).toHaveProperty("id");
			expect(res.body.product).toHaveProperty("title");
			expect(res.body.product).toHaveProperty("description");
			expect(res.body.product).toHaveProperty("imageUrl");
			expect(res.body.product).toHaveProperty("price");
			expect(res.body.product).toHaveProperty("inStock");
		});

		it("returns 404 if product does not exist", async () => {
			const incorrectId = new mongoose.Types.ObjectId();

			const res = await api
				.get(`/api/products/${incorrectId}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			console.log(res.body);

			expect(res.body.error).toBe("Product not found");
		});
	});
});
