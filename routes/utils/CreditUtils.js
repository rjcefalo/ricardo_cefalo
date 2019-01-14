const axios = require('axios');

module.exports = {
  postCredit(destination, body) {
    return axios.post('http://ricardo_cefalo_messageapp_1:3000/message', {
      credit
    }, { timeout:5000 });
  },
};
