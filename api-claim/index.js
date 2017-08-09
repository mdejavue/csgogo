'use strict';


const PostgresMatchRepository = require('./db/PostgresMatchRepository');
const PORT = process.env.PORT || 3001;
const servicesConfig = require('./../default-services.json');
const postgresConnect = require('./db/postgresConnector')(servicesConfig.postgresql);

const matchRepository = new PostgresMatchRepository(postgresConnect());
const app = require('./logic')({
  matchRepository : matchRepository
});

matchRepository.initialize().then(function() {
  app.listen(PORT, function() {
    console.log(`Server started on ${PORT}`);
  });
}).catch(err => {
  console.log(err);
});