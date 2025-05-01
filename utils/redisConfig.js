const Redis = require("ioredis");

// ioredis uses "new Redis()" instead of "createClient"
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD, // Optional, only if your Redis has password
  // tls: {} // Uncomment if your Redis requires SSL
});

// Optional: Listen to events
redisClient.on("connect", () => console.log("Connected to Redis..."));
redisClient.on("error", (err) =>
  console.error("Redis Connection Failed:", err)
);

// No need to call connect manually; ioredis auto-connects.

module.exports = redisClient;
