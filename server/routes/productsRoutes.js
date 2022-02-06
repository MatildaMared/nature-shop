const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");
const tokenHandler = require("../middleware/tokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

// Create new product
router.post("/", tokenHandler, validateAdmin, productsController.createProduct);

// Get all products
router.get("/", productsController.getProducts);

// Get product by id
router.get("/:id", productsController.getProductById);

// Update product
router.put("/:id", tokenHandler, validateAdmin, productsController.updateProduct);

// Delete product
router.delete("/:id", tokenHandler, validateAdmin, productsController.deleteProduct);

module.exports = router;
