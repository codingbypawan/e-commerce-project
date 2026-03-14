const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

router.post('/create', authMiddleware, async (req, res) => {
    const { productList } = req.body;
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password');
        if (!user.userType === 'customer') {
            return res.status(403).send({ message: 'Only Customer can create order' });
        }
        let totalAmount = 0;
        for (const item of productList) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).send({ message: `Product with ID ${item.productId} not found` });
            }
            if(product.inventoryQuantity < item.quantity) {
                return res.status(400).send({ message: `Insufficient inventory for product ${product.name}` });
            }
            if (product.discountValidFrom < new Date() && product.discountValidTo > new Date()) {
                totalAmount += (product.price - product.discount) * item.quantity;
            }
            else {
                totalAmount += product.price * item.quantity;
            }
        }
        const newOrder = new Order({
            productList,
            amount: totalAmount,
            customerId: user._id,
            sellerId: productList.length > 0 ? (await Product.findById(productList[0].productId)).sellerId : null
        });
        const savedOrder = await newOrder.save();
        res.status(201).send({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error creating order' });
    }
});

router.get('/list', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password');
        let orders;
        if (user.userType === 'customer') {
            orders = await Order.find({ customerId: user._id }).populate('productList.productId', 'name price').populate('sellerId', 'name email');
        } else if (user.userType === 'seller') {
            orders = await Order.find({ sellerId: user._id }).populate('productList.productId', 'name price').populate('customerId', 'name email');
        } else {
            return res.status(403).send({ message: 'Invalid user type' });
        }
        res.status(200).send({ message: 'Orders fetched successfully', orders });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error fetching orders' });
    }
});

module.exports = router;