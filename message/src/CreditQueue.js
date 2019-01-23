const Bull = require("bull");
const urls = require("./urls");

const queue = new Bull("credit-queue", urls.REDIS_URL);

module.exports = function(job){
    queue.add(job)
}