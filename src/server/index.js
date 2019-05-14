const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/json");
  next();
});

app.get("/", ( (req, res) => {
    request('http://test.clevertec.ru/tt/meta', (error, response, body) => {
      if(error) {
        res.sendStatus(500);
      }
      res.send(body);
    })
  }
));

app.post("/send", ( (req, res) => {
    request({
      url: 'http://test.clevertec.ru/tt/data',
      method: "POST",
      json: true,
      body: req.body
    }, (error, response, body) => {
      if(error) {
        res.sendStatus(500)
      }
        res.send(body);
    })
}));

app.listen(4000, () => {
  console.log("server is listening");
});
