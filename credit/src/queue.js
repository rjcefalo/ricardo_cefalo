const Bull = require("bull");
const urls = require("./urls");

module.exports = new Bull("credit-queue", urls.REDIS_URL);