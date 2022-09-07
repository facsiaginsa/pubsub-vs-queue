const axios = require("axios")
const { APP1 } = require("../configs")

module.exports = async (message) => {
    await axios.post(APP1 + "/notification", {
        message
    })
}