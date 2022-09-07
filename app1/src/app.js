const app = require("fastify")()
const cron = require('node-cron');
const { MODE, PORT, IPBIND } = require("./configs");
const redisMsgQueue = require("./models/redisMsgQueue");
const redisPubSub = require("./models/redisPubSub");

let counter = 1;

cron.schedule("* * * * * *", async () => {
    const message = "I want a pizza "

    if (MODE == "queue") {
        await redisMsgQueue(message + counter)
    }

    if (MODE == "pubsub") {
        await redisPubSub(message + counter)
    }

    counter++
})

app.post("/notification", async (req,res) => {
    console.log(req.body.message)
})

app.listen({port: PORT, host: IPBIND})
