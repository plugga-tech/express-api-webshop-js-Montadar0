// controllers/productController.js
const Product = require('../models/Product');

// Controller function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(`Error fetching products: ${error}`);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllProducts,
    // Add other product-related controller functions as needed
};