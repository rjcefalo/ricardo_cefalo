const MessageappUtils = require("./utils/MessageappUtils");
const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello, world" });
});

router.post("/message", (req, res, next) => {
  const { destination, body } = req.body;
  console.log(typeof destination);

  if (destination == '') {
    res
      .status(422)
      .json({ message: "Destination must be at least 1 character long" });
  }
  if (body == '') {
    res.status(422).json({ message: "Body must be at least 1 character long" });
  }

  if (
    destination &&
    body &&
    (typeof destination != "string" || typeof body != "string")
  ) {
    res.status(400).json({ message: "Wrong type of data" });
  }

  if (!body) {
    res.status(400).json({ message: "Body key missing" });
  }

  if (!destination) {
    res.status(400).json({ message: "Destination key missing" });
  }



  MessageappUtils.postMessage(destination, body)
    .then(resp => {
      res.status(200).json(JSON.stringify(resp.data));
    })
    .catch(resp => {
      res.status(500).json({ message: "Error en el servicio" });
    });
});

module.exports = router;
