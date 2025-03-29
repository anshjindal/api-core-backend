const mongoose = require("mongoose");
let connections = {};

const connectToDB = async (dbName) => {
    mongoose.set('strictQuery', true);

    if (connections[dbName]) {
        console.log(`MongoDB Connection Ok. Connected to ${dbName}`);
        return connections[dbName];
    }

    try {
        // Use the correct environment variable and provide a fallback
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kc_garments?replicaSet=rs0';
        
        const connection = await mongoose.connect(uri, {
            dbName: dbName,
            serverSelectionTimeoutMS: 5000
        });

        connections[dbName] = connection;
        console.log(`Successfully connected to MongoDB: ${dbName}`);

    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}

module.exports = connectToDB;