const express = require('express');
const authMiddleware = require('../authMiddleware');
const Product = require('../models/product');
const User = require('../models/user');

const router = express.Router();

router.post('/add', authMiddleware, async (req, res) => {
    const { name, description, productImage, price, discount, discountValidFrom, discountValidTo, inventoryQuantity } = req.body;

    console.log('Authenticated user:', req.user);
    const user = await User.findOne({ email: req.user.email }).select('-password');

    console.log('Fetched user from DB:', user);

    if(!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    if(user.userType !== 'seller') {
        return res.status(403).send({ message: 'Only sellers can add products' });
    }

    const newProduct = new Product({
        name,
        description,
        productImage,
        price,
        discount,
        discountValidFrom,
        discountValidTo,
        sellerId: user._id,
        inventoryQuantity
    });

    const savedProduct = await newProduct.save();
    res.status(201).send({ message: 'Product added successfully', product: savedProduct });
});

router.get('/list', authMiddleware, async (req, res) => {
    try {
        const products = await Product.find().populate('sellerId', 'name email');
        res.send({ message: 'Products fetched successfully', products });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error fetching products' });
    }
});


router.get('/:id', authMiddleware, async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId).populate('sellerId', 'name email');
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send({ message: 'Product fetched successfully', product });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error fetching product' });
    }
});

router.put('/update/:id', authMiddleware, async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).select('-password');
    if (!user) {
        return res.status(403).send({ message: 'Forbidden' });
    }

    if (user.userType !== 'seller') {
        return res.status(403).send({ message: 'Only sellers can update products' });
    }
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
    }
    if (product.sellerId.toString() !== user._id.toString()) {
        return res.status(403).send({ message: 'You can only update your own products' });
    }   

    const { name, description, productImage, price, discount, discountValidFrom, discountValidTo, inventoryQuantity } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.productImage = productImage || product.productImage;
    product.price = price !== undefined ? price : product.price;
    product.discount = discount !== undefined ? discount : product.discount;
    product.discountValidFrom = discountValidFrom || product.discountValidFrom;
    product.discountValidTo = discountValidTo || product.discountValidTo;
    product.inventoryQuantity = inventoryQuantity !== undefined ? inventoryQuantity : product.inventoryQuantity;
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name: product.name, description: product.description, productImage: product.productImage, price: product.price, discount: product.discount, discountValidFrom: product.discountValidFrom, discountValidTo: product.discountValidTo, inventoryQuantity: product.inventoryQuantity },
            { new: true }
        );
        res.send({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Error updating product' });
    }
});

module.exports = router;