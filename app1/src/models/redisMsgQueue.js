const Redis = require("ioredis")
const { REDIS_PORT, REDIS_HOST, REDIS_PASS } = require("../configs")
const producer = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASS
})

module.exports = async (message) => {
    console.log("sending message to redis queue..")
    await producer.lpush("orderqueue", message)
}