const { MODE } = require("./configs")
const sendMessage = require("./models/sendMessage")

if (MODE == "queue") {
    let getQueuedMessage = require("./models/redisMsgQueue")

    // Queue mode
    function redisLoop() {
        getQueuedMessage()
        .then((message) => {
            console.log(message[1])

            sendMessage("app2 handle: " + message[1].replace("I want a ", ""))
            
            redisLoop()
        })
    }
    redisLoop()
}

//Pubsub mode
if (MODE == "pubsub") {
    let redisPubSub = require("./models/redisPubSub")

    redisPubSub()
}