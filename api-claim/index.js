'use strict';

const app = require('./logic')();

app.listen(3001, function() {
  console.log('Server started');
});