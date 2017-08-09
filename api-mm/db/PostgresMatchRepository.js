'use strict';

const MatchRepository = require('./MatchRepository');

class PostgresMatchRepository extends MatchRepository {

  constructor(sequelize) {
    super();
    this._sequelize = sequelize;
  }

 initialize() {
    this._MatchResult = this._sequelize.import('./models/matchResult.js');
    return this._sequelize.sync();
  }

 getAll() {
    return this._MatchResult.findAll();
  }

 findMatchResultById(id) {
    return this._MatchResult.findById(id);
  }

 addMatchResult(matchResultObj) {
    return this._MatchResult.create(matchResultObj);
  }
}

module.exports = PostgresMatchRepository;