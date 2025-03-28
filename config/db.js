const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this is at the top

const connectDB = async () => {
    try {
        // Log environment variables to debug
        console.log('MongoDB URI from env:', process.env.MONGODB_URI);
        console.log('All environment variables:', process.env);

        // Validate MongoDB URI
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: 'majority'
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        // Exit the process with failure
        process.exit(1);
    }
};

module.exports = connectDB;