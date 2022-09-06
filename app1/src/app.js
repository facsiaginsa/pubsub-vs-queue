const app = require("fastify")()
const cron = require('node-cron');
const { PORT, IPBIND } = require("./configs");
const redisMsgQueue = require("./models/redisMsgQueue");

let counter = 1;

cron.schedule("* * * * * *", async () => {
    const message = "I want a pizza "

    await redisMsgQueue(message + counter)
    counter++
})

app.post("/notification", async (req,res) => {
    console.log(req.body.message)
})

app.listen({port: PORT, host: IPBIND})
