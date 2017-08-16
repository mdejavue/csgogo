'use strict';

const MatchRepository = require('./MatchRepository');

class PostgresMatchRepository extends MatchRepository {

  constructor(sequelize) {
    super();
    this._sequelize = sequelize;
  }

 initialize() {
    this._MatchResult = this._sequelize.import('./models/matchResult.js');
    return this._sequelize.sync({ force: true });
  }

 getAll() {
    return this._MatchResult.findAll();
  }

 findMatch(matchId, playerId) {
    return this._MatchResult.find({
        where: {
           matchId: matchId,
           playerId : playerId
        }
    });
  }

 addMatchResult(matchResultObj) {
    return this._MatchResult.create(matchResultObj);
  }

  deleteAll() {
    return this._MatchResult.destroy({where:{/*no criteria*/}});
  }
}

module.exports = PostgresMatchRepository;