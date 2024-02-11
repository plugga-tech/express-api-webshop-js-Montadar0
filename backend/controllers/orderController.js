const Order = require('../models/Order');

// Controller function to create a new order for a specific user
const createOrder = async (req, res) => {
    const { user, products } = req.body;

    try {
        const newOrder = new Order({
            user,
            products,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(`Error creating order: ${error}`);
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get all orders with populated user and product details
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'id name email') // Populate user details
            .populate('products.productId', 'id name price'); // Populate product details

        res.json(orders);
    } catch (error) {
        console.error(`Error fetching orders: ${error}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
};
