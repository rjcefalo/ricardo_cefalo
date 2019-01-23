const Message = require("../models/message");
const saveMessageTransaction = require("../transactions/saveMessage");

module.exports = function(messageParams, cb) {
          saveMessageTransaction(messageParams, cb);
};
