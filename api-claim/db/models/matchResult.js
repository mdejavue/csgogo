'use strict';

module.exports = (sequelize, DataTypes) => {

  let matchResult = sequelize.define(

    //name
    "matchResult",

    //attributes
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      matchId: { type: DataTypes.STRING(40), allowNull: false },
      playerId: { type: DataTypes.STRING(40), allowNull: false },
      claimed: { type: DataTypes.BOOLEAN, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false }
    }
  );

  return matchResult;
}