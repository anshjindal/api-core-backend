const mongoose = require("mongoose");
const getConnectionConfig = require("../config/database");
let connections = {};

const connectToDB = async (dbName) => {
    mongoose.set('strictQuery', true);

    if (connections[dbName]) {
        console.log(`MongoDB Connection Ok. Connected to ${dbName}`);
        return connections[dbName]; // Return the existing connection
    }

    const config = getConnectionConfig();

    try {
        const connection = await mongoose.connect(config.mongodb.uri, {
            dbName: dbName
        });

        connections[dbName] = connection;
        console.log(`MongoDB connected to ${dbName}`);

        // Setup Redis connection
        const Redis = require('redis');
        const redisConfig = {
            url: `redis://${config.redis.host}:${config.redis.port}`
        };
        
        // Only add password if it exists in config
        if (config.redis.password) {
            redisConfig.password = config.redis.password;
        }

        const redisClient = Redis.createClient(redisConfig);

        redisClient.on('error', (err) => console.log('Redis Connection Failed:', err));
        redisClient.on('connect', () => console.log('Redis Connected'));

        await redisClient.connect();

        global.redisClient = redisClient;

    } catch (error) {
        console.error("Database connection error:", error);
        // Don't exit process, let the application handle the error
        throw error;
    }
}

module.exports = connectToDB;
