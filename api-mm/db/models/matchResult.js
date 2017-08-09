'use strict';

module.exports = (sequelize, DataTypes) => {

  let matchResult = sequelize.define(

    //name
    "matchResult",

    //attributes
    {
      id: { type: DataTypes.STRING(40), primaryKey: true },
      createdAt: { type: DataTypes.DATE, allowNull: false }

    }
  );

  return matchResult;
}