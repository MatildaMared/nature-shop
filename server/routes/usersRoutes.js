const { Router } = require("express");
const router = new Router();
const usersController = require("../controllers/usersController");

// Create new user
router.post("/", usersController.createUser);

// Log in user
router.post("/login", usersController.loginUser);

// Get user by id
router.get("/:id", usersController.getUserById);

// Update user
router.put("/:id", usersController.updateUser);

// Delete user
router.delete("/:id", usersController.deleteUser);

module.exports = router;
