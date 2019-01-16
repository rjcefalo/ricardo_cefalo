const axios = require('axios');

module.exports = {
  postMessage(destination, body) {
    return axios.post('http://ricardo_cefalo_messageapp_1:3000/message', {
      destination,
      body,
    }, { timeout:3000 });
  },
};
