const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order for a specific user
router.post('/add', orderController.createOrder);

// Route to get all orders
router.get('/all', orderController.getAllOrders);

module.exports = router;
