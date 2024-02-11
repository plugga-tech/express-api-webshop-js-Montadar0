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

// Controller function to get a specific product by ID
const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(`Error fetching product by ID: ${error}`);
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to create a new product
const createProduct = async (req, res) => {
    const { name, description, price, lager } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            lager,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(`Error creating product: ${error}`);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    // Add other product-related controller functions as needed
};
