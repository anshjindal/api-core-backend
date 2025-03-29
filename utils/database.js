const mongoose = require("mongoose");
let connections = {};

const connectToDB = async (dbName) => {
    mongoose.set('strictQuery', true);

    if (connections[dbName]) {
        console.log(`MongoDB Connection Ok. Connected to ${dbName}`);
        return connections[dbName]; 
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: dbName,
        });

        connections[dbName] = connection;

        console.log(`MongoDB connected to ${dbName}`);

    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = connectToDB;
