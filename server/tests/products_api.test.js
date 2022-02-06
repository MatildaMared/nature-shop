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

describe("Products API", () => {
	let token;
	let nonAdminToken;

	beforeAll(async () => {
		connectToDB();

		// Creating dummy users and tokens
		const user = await User.create(dummyAdmin);
		token = user.getToken();
		const nonAdminUser = await User.create(dummyUser);
		nonAdminToken = nonAdminUser.getToken();
	});

	// ###
	// ### Creating a new product ###
	// ###

	describe("Creating a new product", () => {
		beforeAll(async () => {
			await Product.deleteMany({});
		});

		it("creates a new product in the database and returns it", async () => {
			const res = await api
				.post("/api/products")
				.send(dummyProduct)
				.set("Authorization", `Bearer ${token}`)
				.expect(201);

			expect(res.body.product.title).toBe(dummyProduct.title);
		});

		it("fails with status code 401 if token is missing", async () => {
			const res = await api
				.post("/api/products")
				.send(dummyProduct)
				.expect(401);

			expect(res.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const invalidToken = "invalid123";

			const res = await api
				.post("/api/products")
				.send(dummyProduct)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401);

			expect(res.body.error).toBe("Invalid token");
		});

		it("fails with status code 401 if user role is not admin", async () => {
			const res = await api
				.post("/api/products")
				.send(dummyProduct)
				.set("Authorization", `Bearer ${nonAdminToken}`)
				.expect(401);

			expect(res.body.error).toBe("Unauthorized");
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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
				.set("Authorization", `Bearer ${token}`)
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

			const titles = res.body.products.map((product) => product.title);
			dummyProducts.forEach((product) => {
				expect(titles).toContain(product.title);
			});
		});

		it("returns an array of all products with the correct fields", async () => {
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

		it("fails with status code 404 if product does not exist", async () => {
			const incorrectId = new mongoose.Types.ObjectId();

			const res = await api
				.get(`/api/products/${incorrectId}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Product not found");
		});

		it("fails with status code 400 if ID is invalid", async () => {
			invalidId = "wrong123";

			const res = await api
				.get(`/api/products/${invalidId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid ID");
		});
	});

	// ###
	// ### Update product ###
	// ###

	describe("Update product", () => {
		let id;

		beforeAll(async () => {
			await Product.deleteMany({});
			await Product.create(dummyProduct);
			const product = await Product.findOne({ title: dummyProduct.title });
			id = product._id;
		});

		it("updates a product matching the provided id", async () => {
			const updates = {
				title: "Updated product",
				description: "Updated description",
			};

			const res = await api
				.put(`/api/products/${id}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.product.title).toBe(updates.title);
			expect(res.body.product.description).toBe(updates.description);
			expect(res.body.product.imageUrl).toBe(dummyProduct.imageUrl);
			expect(res.body.product.price).toBe(dummyProduct.price);
			expect(res.body.product.inStock).toBe(dummyProduct.inStock);
		});

		it("fails with status code 404 if product does not exist", async () => {
			const incorrectId = new mongoose.Types.ObjectId();

			const updates = {
				title: "Updated",
			};

			const res = await api
				.put(`/api/products/${incorrectId}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Product not found");
		});

		it("fails with status code 400 if ID is invalid", async () => {
			const incorrectId = "abc";

			const updates = {
				title: "Updated",
			};

			const res = await api
				.put(`/api/products/${incorrectId}`)
				.send(updates)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid ID");
		});

		it("fails with status code 401 if token is missing", async () => {
			const updates = {
				title: "Updated",
			};

			const res = await api
				.put(`/api/products/${id}`)
				.send(updates)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const updates = {
				title: "Updated",
			};

			const invalidToken = "wrong456";

			const res = await api
				.put(`/api/products/${id}`)
				.send(updates)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid token");
		});

		it("fails with status code 401 if user is not admin", async () => {
			const updates = {
				title: "Updated",
			};

			const res = await api
				.put(`/api/products/${id}`)
				.send(updates)
				.set("Authorization", `Bearer ${nonAdminToken}`)
				.expect(401);

			expect(res.body.error).toBe("Unauthorized");
		});
	});

	// ###
	// ### Delete product ###
	// ###

	describe("Delete product", () => {
		let id;

		beforeEach(async () => {
			await Product.deleteMany({});
			await Product.create(dummyProduct);
			const product = await Product.findOne({ title: dummyProduct.title });
			id = product._id;
		});

		it("deletes a product matching the provided id", async () => {
			const res = await api
				.delete(`/api/products/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.message).toBe("Product deleted");
			const deletedProduct = await Product.findOne({ _id: id });
			expect(deletedProduct).toBeNull();
		});

		it("fails with status code 404 if product does not exist", async () => {
			const incorrectId = new mongoose.Types.ObjectId();

			const res = await api
				.delete(`/api/products/${incorrectId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Product not found");
		});

		it("fails with status code 400 if ID is invalid", async () => {
			const incorrectId = "abc";

			const res = await api
				.delete(`/api/products/${incorrectId}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid ID");
		});

		it("fails with status code 401 if token is missing", async () => {
			const res = await api
				.delete(`/api/products/${id}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 if token is invalid", async () => {
			const invalidToken = "badToken987";

			const res = await api
				.delete(`/api/products/${id}`)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid token");
		});

		it("fails with status code 401 if user is not admin", async () => {
			const res = await api
				.delete(`/api/products/${id}`)
				.set("Authorization", `Bearer ${nonAdminToken}`)
				.expect(401);

			expect(res.body.error).toBe("Unauthorized");
		});
	});

	afterAll(() => {
		disconnectFromDB();
	});
});
