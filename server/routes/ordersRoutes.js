const { Router } = require("express");
const router = new Router();
const ordersController = require("../controllers/ordersController");
const tokenHandler = require("../middleware/tokenHandler");

// Create new order
router.post("/", tokenHandler, ordersController.createOrder);

module.exports = router;