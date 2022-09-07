const producer = require("../loaders/redis")

module.exports = async (message) => {
    console.log("sending message: " + message + " to redis queue..")
    await producer.lpush("orderqueue", message)
}