const express = require('express');

const router = express.Router();
const axios = require('axios');
const MessageappUtils = require('./utils/MessageappUtils');
const MailUtils = require('./utils/MailUtils');

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
  if (destination == '') {
    res
      .status(422)
      .json({ message: 'Destination must be at least 1 character long' });
  } else if (body == '') {
    return res
      .status(422)
      .json({ message: 'Body must be at least 1 character long' });
  } else if (
    destination
    && body
    && (typeof destination !== 'string' || typeof body !== 'string')
  ) {
    return res.status(400).json({ message: 'Wrong type of data' });
  } else if (!body) {
    return res.status(400).json({ message: 'Body key missing' });
  } else if (!destination) {
    return res.status(400).json({ message: 'Destination key missing' });
  } else {
    MessageappUtils.postMessage(destination, body)
      .then((resp) => {
        MailUtils.create(destination, body)
          .then(answer => res.status(200).json(JSON.stringify(resp.data)))
          .catch(error => res.status(500).json({ message: 'Failed to connect to Database' }));
      })
      .catch((resp) => {
        console.log(resp);

        if (resp.response == undefined) {
          MailUtils.create(
            'error 408 - Request time out',
            'error 408 - Request time out',
          );

          return res.status(408).json({ message: 'Request time out' });
        }
        MailUtils.create(
          'error 500 - Service error',
          'error 500 - Service error',
        );

        return res.status(500).json({ message: 'Service error' });
      });
  }
});

module.exports = router;
