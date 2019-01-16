const mongoose = require('mongoose');
const primary = mongoose.createConnection(process.env.DBURL)
const secundary = mongoose.createConnection(process.env.RSURL)
const Schema = mongoose.Schema;

const mailSchema = new Schema({
  destination: String,
  body: String,
});

const Mail = primary.model('Mail', mailSchema);
const MailRep = secundary.model('Mail', mailSchema)
module.exports = { Mail, MailRep };
