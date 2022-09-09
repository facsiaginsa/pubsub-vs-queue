const subscriber = require("../loaders/redis")
const sendMessage = require("./sendMessage")

module.exports = async () => {
    await subscriber.subscribe("orderpubsub")

    subscriber.on("message", (channel, message) => {
        
        sendMessage("app2 handle: " + message.replace("I want a ", ""))
        
    })
}