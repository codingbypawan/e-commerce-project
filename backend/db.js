const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionString = "mongodb+srv://gurukulonlineshiksha_db_user:Ecki4uxCbvEiW8T5@cluster0.rmvqybn.mongodb.net/?appName=Cluster0";
        await mongoose.connect(connectionString);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;