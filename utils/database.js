const mongoose = require("mongoose");
let connections = {};

const connectToDB = async (dbName) => {
    mongoose.set('strictQuery', true);

    if (connections[dbName]) {
        return connections[dbName];
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: dbName,
        });

        connections[dbName] = connection;

    } catch (error) {
        // Optional: handle error silently or rethrow
        // throw error;
    }
};

module.exports = connectToDB;
