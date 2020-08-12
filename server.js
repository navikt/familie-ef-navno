var dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.use('/', function(req, res, next) {
  console.log(`Server: A new request received at ${process.env.NODE_ENV}`);
  next();
});

app.get('/ping', (req, res) => {
  res.send({ express: ' Ack :) ' });
});

app.get('/isAlive', (req, res) => {
    res.status(200).end();
});

app.get('/isReady', (req, res) => {
    res.status(200).end();
});

app.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'build/', 'index.html'));
});


app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
