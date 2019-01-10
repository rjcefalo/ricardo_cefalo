const Mail = require('../../models/Mail');

module.exports = {
  create(destination, body) {
    const newMail = new Mail({ destination, body });
    return newMail.save();
  },
  get() {
    return Mail.find({});
  },
  delete() {
    return Mail.remove({});
  },
};
