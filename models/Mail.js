const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mailSchema = new Schema({
  destination: String,
  body: String,
});

const Mail = mongoose.model('Mail', mailSchema);
module.exports = Mail;
