const { Router } = require("express");
const router = new Router();
const usersController = require("../controllers/usersController");
const tokenHandler = require("../middleware/tokenHandler");

// Create new user
router.post("/", usersController.createUser);

// Log in user
router.post("/login", usersController.loginUser);

// Get user by id
router.get("/getByToken", tokenHandler, usersController.getSingleUser);

// Update user
router.put("/:id", tokenHandler, usersController.updateUser);

// Delete user
router.delete("/:id", tokenHandler, usersController.deleteUser);

module.exports = router;
