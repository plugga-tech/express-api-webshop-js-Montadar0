// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to create a new user
router.post('/add', userController.registerUser);

// Route to login a user
router.post('/login', userController.loginUser);

// Route to get a specific user by ID
router.post('/', userController.getUserById);

module.exports = router;
