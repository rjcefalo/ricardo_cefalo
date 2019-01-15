const {Mail,MailRep} = require('../../models/Mail');

module.exports = {
  create(destination, body) {
    const newMail = new Mail({ destination, body });
    const newMailRep = new MailRep({ destination, body });
    newMail.save();
    newMailRep.save();
    return ;
  },
  get() {
    return Mail.find({});
  },
  delete() {
    MailRep.remove({})
    return Mail.remove({});
  },
  timeoutCheck(resp, res) {
    if (resp == undefined) {
      this.create(
        'error 408 - Request time out',
        'error 408 - Request time out',
      );

      return res.status(408).json({ message: 'Request time out' });
    }
    this.create(
      'error 500 - Service error',
      'error 500 - Service error',
    );

    return res.status(500).json({ message: 'Service error' });
  }
}

