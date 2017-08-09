'use strict';

const app = require('./logic')();

app.listen(3000, function() {
  console.log('Server started');
});