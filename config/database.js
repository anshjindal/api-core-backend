const getConnectionConfig = () => {
    // Check if running in Docker (presence of Docker-specific hostnames)
    const isDocker = process.env.IS_DOCKER === 'true';

    const config = {
        mongodb: {
            uri: isDocker 
                ? 'mongodb://mongodb:27017/wouessi_ems'
                : 'mongodb://127.0.0.1:27017/wouessi_ems'
        },
        redis: {
            host: isDocker ? 'redis' : '127.0.0.1',
            port: process.env.REDIS_PORT || 6379
        }
    };

    // Only add Redis password for Docker environment
    if (isDocker && process.env.REDIS_PASSWORD) {
        config.redis.password = process.env.REDIS_PASSWORD;
    }

    return config;
};

module.exports = getConnectionConfig; 