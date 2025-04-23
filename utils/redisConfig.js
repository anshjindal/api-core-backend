const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
  tls: process.env.REDIS_HOST && process.env.REDIS_HOST !== '127.0.0.1' ? {} : null,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 20,
  enableAutoPipelining: true,
  connectTimeout: 15000,
  keepAlive: 30000,
});

redis.on('connect', () => console.log('Connected to Redis'));
redis.on('error', (err) => console.error('Redis error:', err));

module.exports = redis;