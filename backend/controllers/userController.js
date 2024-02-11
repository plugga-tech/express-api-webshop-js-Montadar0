// controllers/userController.js
const User = require('../models/User');

// Controller function to register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(`Error registering user: ${error}`);
        res.status(500).json({ error: error.message }); // Send detailed error message
    }
};

// Controller function to login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If everything is valid, respond with the user data (excluding password)
        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'id name email'); // Exclude passwords
        res.json(users);
    } catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: error.message }); // Send detailed error message
    }
};

// Controller function to get a specific user by ID 
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(`Error fetching user by ID: ${error}`);
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    registerUser,
    getUserById,
    loginUser,
    getAllUsers,
    // ... other functions
};
