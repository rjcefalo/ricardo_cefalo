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
  MessageappUtils.postMessage(destination, body, res)
    .then(resp => {
      res.status(200).json(JSON.stringify(resp.data));
    })
    .catch(resp => {
      console.log("here");
      res.status(500).json(resp.data);
    });
});

module.exports = router;
