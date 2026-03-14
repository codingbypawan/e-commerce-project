const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['seller', 'customer']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;