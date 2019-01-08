const axios = require("axios");
module.exports = {
  postMessage(destination, body) {
    return axios.post("http://exercise-1_messageapp_1:3000/message", {
      destination,
      body
    });
  }
};
