const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../authMiddleware');

const JWT_SECRET = 'your_jwt_secret_key';

router.post('/register', async (req, res) => {
    const { name, email, password, phone, userType } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone, userType });
    try {
        if (userType !== 'seller' && userType !== 'customer') {
            return res.status(400).send({ message: 'Invalid user type' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const user = await newUser.save();
        res.status(201).send({ message: 'User registered successfully', profile: {
            name: user.name, 
            email: user.email,
            phone: user.phone,
            userType: user.userType
        } });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: 'Error registering user'+ error.message});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        const token = jwt.sign({ email: user.email, userType: user.userType }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error logging in' });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password -__v -_id');
        if(!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'Profile fetched successfully', profile: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error fetching profile' });
    }
});

router.put('/profile', authMiddleware, async (req, res) => {
    const { name, phone } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            { name, phone });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        updatedUser.password = undefined;
        updatedUser.__v = undefined;
        updatedUser._id = undefined;
        res.send({ message: 'Profile updated successfully', profile: {
            name: updatedUser.name, 
            email: updatedUser.email,
            phone: updatedUser.phone,
            userType: updatedUser.userType
        } });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error updating profile' });
    }
});

module.exports = router;
