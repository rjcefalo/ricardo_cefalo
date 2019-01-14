const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const creditSchema = new Schema({
  credit: Number,
});

const Credit = mongoose.model('Credit', creditSchema);
module.exports = Credit;
