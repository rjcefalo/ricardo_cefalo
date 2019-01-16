const DBUtils = require("../DBUtils")
const mongoose = require('mongoose');
const primary = mongoose.createConnection(DBUtils.getPrimary())
const secundary = mongoose.createConnection(DBUtils.getSecundary())
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  credit: Number,
});

const Credit = primary.model('Credit', creditSchema);
const CreditRep = secundary.model('Credit', creditSchema);
module.exports = { Credit, CreditRep }
