const supertest = require("supertest");
const { app, server } = require("../index");
const api = supertest(app);

const { connectToDB, disconnectFromDB } = require("../database");

describe("Products API", () => {
	beforeAll(() => {
		connectToDB();
	});

	afterAll(() => {
		disconnectFromDB();
		server.close();
	});

	describe("Creating a new product", () => {
		it("succeeds provided all necessary data", async () => {
			const product = {
				title: "Test product",
				description: "Test description",
				imageUrl: "https://test.com/test.jpg",
				price: 10,
			};
			const res = await api.post("/api/products").send(product);

			expect(res.status).toBe(200);
		});
	});
});
