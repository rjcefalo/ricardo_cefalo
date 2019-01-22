const getCredit = require("../clients/getCredit");

module.exports = function(req, res) {
  getCredit().then(credit => {
    res.json(credit[0]);
  });
};
