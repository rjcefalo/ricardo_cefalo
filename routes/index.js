const express = require('express');

const router = express.Router();
const axios = require('axios');
const MessageappUtils = require('./utils/MessageappUtils');
const MailUtils = require('./utils/MailUtils');
const Validate = require("./utils/Validate")
const CreditCheck = require("./utils/CreditCheck")


/* GET home page */
router.get('/', (req, res, next) => res.status(200).json({ message: 'Hello, world' }));

router.get('/message', (req, res, next) => {
  MailUtils.get()
    .then(mails => res.status(200).json({ mails }))
    .catch(err => res.status(500).json({ message: 'Error en el servicio' }));
});

router.delete('/message', (req, res, next) => {
  MailUtils.delete()
    .then(del => res.status(200).json({ message: 'Mails deleted' }))
    .catch(error => res.status(500).json({ message: 'Something went wrong' }));
});

router.post('/message', (req, res, next) => {
  const { destination, body } = req.body;
  CreditCheck.check().then(resp => {
    if (resp) {
      if (Validate(req, res)) {
        MessageappUtils.postMessage(destination, body)
          .then((resp) => {
            MailUtils.create(destination, body)
              .then(answer => {
                CreditCheck.pay()
                res.status(200).json(JSON.stringify(resp.data))
              })
              .catch(error => res.status(500).json({ message: 'Failed to connect to Database' }));
          })
          .catch((resp) => {
            MailUtils.timeoutCheck(resp.response, res)
          });
      }
    } else {
      res.status(400).json({ message: 'Not enough credits' })
    }
  })

});

router.post('/credit', (req, res, next) => {
  const { credit } = req.body;

  CreditCheck.add(credit, res)

});

module.exports = router;
