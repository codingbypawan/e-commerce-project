const express = require('express');
const connectDB = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const authMiddleware = require('./authMiddleware');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const orderRoute = require('./routes/orderRoute');


const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());

app.use('/products', productRoute);
app.use('/auth', authRoute);
app.use('/orders', orderRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});