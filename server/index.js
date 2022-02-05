require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const PORT = process.env.PORT || 8080;
const { connectToDB } = require("./database");

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
app.use("/api/users", usersRoutes);

// Serve static files from client build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

// Start server
const server = app.listen(PORT, () => {
	console.log(`Server up and running on PORT ${PORT}! 🦄`);
});

// Error middleware
app.use(errorHandler);

// Connect to database
if (process.env.NODE_ENV !== "test") {
	connectToDB();
}

module.exports = { app, server };
