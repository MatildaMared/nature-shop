const supertest = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../index");
const api = supertest(app);
const { dummyUser } = require("./dummyData");
const { connectToDB, disconnectFromDB } = require("../database");
const User = require("../models/userModel");

describe("Users API", () => {
	beforeAll(() => {
		connectToDB();
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

	// ###
	// ### User login
	// ###

	describe("User login", () => {
		beforeAll(async () => {
			await User.deleteMany({});
			await User.create(dummyUser);
		});

		it("succeeds when provided correct credentials", async () => {
			const credentials = {
				email: dummyUser.email,
				password: dummyUser.password,
			};

			const res = await api
				.post("/api/users/login")
				.send(credentials)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.token).toBeDefined();
			expect(res.body.user.name).toBe(dummyUser.name);
			expect(res.body.user.email).toBe(dummyUser.email);
		});

		it("fails with status code 401 when email is not registered", async () => {
			const credentials = {
				email: "notRegisteredEmail",
				password: dummyUser,
			};

			const res = await api
				.post("/api/users/login")
				.send(credentials)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid credentials");
		});

		it("fails with status code 401 when password is incorrect", async () => {
			const credentials = {
				email: dummyUser.email,
				password: "wrongPassword",
			};

			const res = await api
				.post("/api/users/login")
				.send(credentials)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid credentials");
		});

		it("fails with status code 400 when email is missing", async () => {
			const credentials = {
				password: dummyUser.password,
			};

			const res = await api
				.post("/api/users/login")
				.send(credentials)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter an email");
		});

		it("fails with status code 400 when password is missing", async () => {
			const credentials = {
				email: dummyUser.email,
			};

			const res = await api
				.post("/api/users/login")
				.send(credentials)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please enter a password");
		});
	});

	// ###
	// ### Get user by ID
	// ###

	describe("Get user by ID", () => {
		let token;
		let id;

		beforeAll(async () => {
			await User.deleteMany({});
			const user = await User.create(dummyUser);
			token = user.getToken();
			id = user._id;
		});

		it("succeeds provided a valid token", async () => {
			const res = await api
				.get(`/api/users/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.user.name).toBe(dummyUser.name);
			expect(res.body.user.email).toBe(dummyUser.email);
		});

		it("fails with status code 401 when token is missing", async () => {
			const res = await api
				.get(`/api/users/${id}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 when token is invalid", async () => {
			const invalidToken = "bad493";

			const res = await api
				.get(`/api/users/${id}`)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid token");
		});
	});

	// ###
	// ### Updating a user
	// ###

	describe("Updating a user", () => {
		let token;
		let id;

		beforeAll(async () => {
			await User.deleteMany({});
			const user = await User.create(dummyUser);
			token = user.getToken();
			id = user._id;
		});

		it("succeeds provided a valid token", async () => {
			const updates = {
				name: "Updated name",
				address: {
					city: "Another city",
				},
			};

			const res = await api
				.put(`/api/users/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.send(updates)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.user.name).toBe(updates.name);
		});

		it("fails with status code 401 when token is missing", async () => {
			const updates = {
				name: "Updated name",
			};

			const res = await api
				.put(`/api/users/${id}`)
				.send(updates)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 when token is invalid", async () => {
			const updates = {
				name: "Updated name",
			};

			const invalidToken = "verybad983";

			const res = await api
				.put(`/api/users/${id}`)
				.set("Authorization", `Bearer ${invalidToken}`)
				.send(updates)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid token");
		});

		it("fails if you try to update the password to one with less than 5 characters", async () => {
			const updates = {
				password: "test",
			};

			const res = await api
				.put(`/api/users/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.send(updates)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Password must be at least 5 characters");
		});
	});

	// ###
	// ### Deleting a user
	// ###

	describe("Deleting a user", () => {
		let id;
		let token;

		beforeEach(async () => {
			await User.deleteMany({});
			const user = await User.create(dummyUser);
			token = user.getToken();
			id = user._id;
		});

		it("succeeds provided a valid token and id", async () => {
			const res = await api
				.delete(`/api/users/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(res.body.message).toBe("User deleted");
			const user = await User.findById(id);
			expect(user).toBe(null);
		});

		it("fails with status code 401 when token is missing", async () => {
			const res = await api
				.delete(`/api/users/${id}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Please provide a token");
		});

		it("fails with status code 401 when token is invalid", async () => {
			const invalidToken = "notValid236";

			const res = await api
				.delete(`/api/users/${id}`)
				.set("Authorization", `Bearer ${invalidToken}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("Invalid token");
		});

		it("fails with status 404 if user is already deleted", async () => {
			await User.findByIdAndDelete(id);
			const res = await api
				.delete(`/api/users/${id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(res.body.error).toBe("User not found");
		});
	});

	afterAll(() => {
		disconnectFromDB();
	});
});
