'use strict';

const Sequelize = require('sequelize');

/**
 * Create a factory function for a connection to the database for the given
 * credentials.
 * @returns {function} factory function for a database connection
 */
module.exports = function (postgresCredentials) {

  let options = {
    host: postgresCredentials.hostname,
    port: postgresCredentials.port,
    dialect: 'postgres',
    pool: { max: 10, min: 0, idle: 10000 }
    //,logging: false   //this would turn off logging of SQL etc, we can also pass a function., and make this a parameter
  }
  let sequelize = new Sequelize(postgresCredentials.dbname, postgresCredentials.username, postgresCredentials.password, options);

  return function () {
    return sequelize;
  };
};