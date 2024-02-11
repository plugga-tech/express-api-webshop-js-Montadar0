// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to get a specific product by ID
router.get('/:id', productController.getProductById);

// Route to create a new product
router.post('/add', productController.createProduct);

module.exports = router;
