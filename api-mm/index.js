'use strict';

const PORT = process.env.PORT || 3001;
const app = require('./logic')();

app.listen(PORT, function() {
  console.log(`Server started on ${PORT}`);
});