const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const api = supertest(app);
const { dummyUser } = require("./dummyData");
const { connectToDB, disconnectFromDB } = require("../database");
const User = require("../models/userModel");

describe("Users API", () => {
	beforeAll(() => {
		connectToDB();
	});

	afterAll(() => {
		disconnectFromDB();
		server.close();
	});

	// ###
	// ### Creating a user
	// ###

	describe("Creating a user", () => {
		beforeEach(async () => {
			await User.deleteMany({});
		});

		it("creates a new user in the database and return it", async () => {
			const res = await api
				.post("/api/users")
				.send(dummyUser)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			expect(res.body.user.name).toBe(dummyUser.name);
			expect(res.body.user.email).toBe(dummyUser.email);
			expect(res.body.user.address.street).toBe(dummyUser.address.street);
			expect(res.body.user.address.city).toBe(dummyUser.address.city);
			expect(res.body.user.address.postalCode).toBe(
				dummyUser.address.postalCode
			);
		});

		it("fails with status code 400 if name is missing", async () => {
			const user = {
				email: dummyUser.email,
				password: dummyUser.password,
				address: dummyUser.address,
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a name");
		});

		it("fails with status code 400 if name is not of type string", async () => {
			const user = {
				name: 1,
				email: dummyUser.email,
				password: dummyUser.password,
				address: dummyUser.address,
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a valid name");
		});

		it("fails with status code 400 if email is missing", async () => {
			const user = {
				name: dummyUser.name,
				password: dummyUser.password,
				address: dummyUser.address,
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter an email");
		});

		it("fails with status code 400 if email is invalid", async () => {
			const user = {
				name: dummyUser.name,
				email: "invalidEmail",
				password: dummyUser.password,
				address: dummyUser.address,
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a valid email");
		});

		it("fails with status code 400 if password is missing", async () => {
			const user = {
				name: dummyUser.name,
				email: dummyUser.email,
				address: dummyUser.address,
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a password");
		});

		it("fails with status code 400 if password has less than five characters", async () => {
			const user = {
				name: dummyUser.name,
				email: dummyUser.email,
				password: "test",
				address: dummyUser.address,
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Password must be at least 5 characters");
		});

		it("fails with status code 400 if street address is missing", async () => {
			const user = {
				name: dummyUser.name,
				email: dummyUser.email,
				password: dummyUser.password,
				address: {
					city: dummyUser.address.city,
					postalCode: dummyUser.address.postalCode,
				},
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a street address");
		});

		it("fails with status code 400 if postal code is missing", async () => {
			const user = {
				name: dummyUser.name,
				email: dummyUser.email,
				password: dummyUser.password,
				address: {
					street: dummyUser.address.street,
					city: dummyUser.address.city,
				},
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a postal code");
		});

		it("fails with status code 400 if city is missing", async () => {
			const user = {
				name: dummyUser.name,
				email: dummyUser.email,
				password: dummyUser.password,
				address: {
					street: dummyUser.address.street,
					postalCode: dummyUser.address.postalCode,
				},
			};

			const res = await api
				.post("/api/users")
				.send(user)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a city");
		});
	});
});
