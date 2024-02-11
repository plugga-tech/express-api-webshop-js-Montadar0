const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Montadar-Alfadel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Example middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next(); // Call the next middleware in the stack
});

// Routes
const productRoutes = require('./routes/productRoutes'); // Include product routes
const userRoutes = require('./routes/userRoutes'); // Include user routes
const orderRoutes = require('./routes/orderRoutes'); // Include order routes

// Use the routes
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/orders', orderRoutes); // Use order routes

// Test route to check the database connection
app.get('/testdb', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('Database connection is successful!');
    } else {
        res.status(500).send('Error connecting to the database');
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the webshop API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
