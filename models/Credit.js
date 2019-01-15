const mongoose = require('mongoose');
const primary = mongoose.createConnection(process.env.DBURL)
const secundary = mongoose.createConnection(process.env.RSURL)
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  credit: Number,
});

const Credit = primary.model('Credit', creditSchema);
const CreditRep = secundary.model('Credit', creditSchema);
module.exports = { Credit, CreditRep }
