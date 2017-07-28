var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + "/"));

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});