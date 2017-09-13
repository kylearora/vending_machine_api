'use strict';
module.exports = function(sequelize, DataTypes) {
  var monies = sequelize.define('monies', {
    totalmoney: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return monies;
};