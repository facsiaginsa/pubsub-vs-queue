const consumer = require("../loaders/redis")

module.exports = async () => {
    let message = await consumer.brpop("orderqueue", "0")
    return message
}