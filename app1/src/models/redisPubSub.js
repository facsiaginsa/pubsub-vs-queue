const publisher = require("../loaders/redis")

module.exports = async (message) => {
    console.log("sending message: " + message + " to redis pubsub..")
    await publisher.publish("orderpubsub", message)
}