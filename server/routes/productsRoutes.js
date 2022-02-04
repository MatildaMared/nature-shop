const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");

// Create new product
router.post("/", productsController.createProduct);

// Get all products
router.get("/", productsController.getProducts);

// Get product by id
router.get("/:id", productsController.getProductById);

// Update product
router.put("/:id", productsController.updateProduct);

// Delete product
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
