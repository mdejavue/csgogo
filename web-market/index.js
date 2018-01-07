const express = require('express');
const request = require('request');
const session = require('express-session');

const app = express();

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + "/"));

var port = process.env.PORT || 8001;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});