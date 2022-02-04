require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const productsRoutes = require("./routes/productsRoutes");
const PORT = process.env.PORT || 8080;

// Create server
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/test", (req, res) => {
	res.json({ message: "JSON working" });
});

app.use("/api/products", productsRoutes);

// Serve static files from client build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

// Start server
if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => {
		console.log(`Server up and running on PORT ${PORT}! 🦄`);
	});
}

// Error middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to database... 📝");
	})
	.catch((err) => {
		console.log("There was an error connecting to database: ", err);
	});
