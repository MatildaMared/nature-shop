const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongoMockServer = null;

let dbUrl = process.env.MONGODB_URI;

const connectToDB = async () => {
	try {
		if (process.env.NODE_ENV === "test") {
			mongoMockServer = await MongoMemoryServer.create();
			dbUrl = mongoMockServer.getUri();
		}

		const connection = await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Connected to database... 📝");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

const disconnectFromDB = async () => {
	try {
		await mongoose.connection.close();
		if (mongoMockServer) {
			await mongoMockServer.stop();
		}
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = { connectToDB, disconnectFromDB };
