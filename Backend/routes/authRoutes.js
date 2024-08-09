const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Hardcoded credentials
const HARDCODED_EMAIL = "xyz@xyz.com";
const HARDCODED_PASSWORD = "12";

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // No password hashing, save directly
        const user = new User({ email, password });
        await user.save();
        res.send({ message: 'User created successfully' });
    } catch (err) {
        res.status(422).send({ error: 'Error creating user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check against hardcoded credentials
        if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
            return res.send({ message: 'Login successful' });
        } else {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;
