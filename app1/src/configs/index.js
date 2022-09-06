module.exports = {
    PORT: parseInt(process.env.PORT) || 3000,
    IPBIND: process.env.IPBIND || "0.0.0.0",
    REDIS_HOST: process.env.APP2_URL || "127.0.0.1",
    REDIS_PORT: parseInt(process.env.REDIS_PORT) || 6379,
    REDIS_PASS: process.env.REDIS_PASS
}