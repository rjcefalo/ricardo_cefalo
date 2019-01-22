const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const {
  Validator,
  ValidationError
} = require("express-json-validator-middleware");

const sendMessage = require("./src/controllers/sendMessage");
const getMessages = require("./src/controllers/getMessages");
const updateCredit = require("./src/controllers/updateCredit");

const Queue = require("bull")

const messageQueue = new Queue("message", "redis://redis:6379")

messageQueue.process((job, done) => {
  console.log(job.data.data);
  console.log("process queue");
  //sendMessage(job.data.data, res)
  done()
})

messageQueue.on('uncaughtException', function (err) {
  console.log(err);
});

messageQueue.on('completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
})


function prueba (req,res) {
  sendMessage(req, res)
  messageQueue.add(()=>console.log("hey"))
}

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string"
    },
    body: {
      type: "string"
    },
    location: {
      name: {
        type: "string"
      },
      cost: {
        type: "number"
      }
    }
  }
};

const creditSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    location: {
      type: "string"
    },
    amount: {
      type: "number"
    }
  }
};

app.post(
  "/messages",
  bodyParser.json(),
  validate({ body: messageSchema }),
  prueba
);

app.post(
  "/credit",
  bodyParser.json(),
  validate({ body: creditSchema }),
  updateCredit
);

app.get("/messages", getMessages);

app.use(function (err, req, res, next) {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

app.listen(9005, function () {
  console.log("App started on PORT 9005");
});

