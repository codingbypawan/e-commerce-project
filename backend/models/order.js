const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productList: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'INPROGRESS', 'DISPATCHED', 'DELIVERED'],
        default: 'PENDING'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;