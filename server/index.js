const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/test", (req, res) => {
	res.json({ message: "JSON working" });
});

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server up and running on PORT ${PORT}! 🦄`);
});
