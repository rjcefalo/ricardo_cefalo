const Bull = require("bull");
const urls = require("./urls");
const getCredit = require("./clients/getCredit")


const queue = new Bull("credit-queue", urls.REDIS_URL);
const MessageQueue = new Bull("message-queue", urls.REDIS_URL);

module.exports = function () {

    queue.process((job, done) => {
        getCredit()
        .then(result=>{
            if (result[0].amount){
                MessageQueue.add(job.data)
            }else {
                console.log ("/////////////////////////      not enough credits        ////////////////////////////")
            }
        })
        done();
    })
}