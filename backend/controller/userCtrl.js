const Users = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Add a new user
const addUser = async (req, res) => {
    const { username, pass } = req.body;
    
    try {
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(409).send({ useradd: 'failed', message: 'User with this username already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = new Users({ username, pass: hashedPassword });
        const addedUser = await user.save();

        res.status(201).send({ useradd: 'success', user: addedUser });

    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ useradd: 'failed', message: 'Server error, please try again later' });
    }
};

// Authenticate and get user with JWT token
const getSingle = async (req, res) => {
    const { username, pass } = req.body;

    try {
        const existingUser = await Users.findOne({ username });
        if (!existingUser) {
            return res.status(404).send({ userget: 'failed', message: 'User not found' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(pass, existingUser.pass);
        if (!isMatch) {
            return res.status(401).send({ userget: 'failed', message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id, username: existingUser.username }, JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(200).send({ user: existingUser, token, message: 'success' });

    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ userget: 'failed', message: 'Server error, please try again later' });
    }
};

module.exports = { addUser, getSingle };
