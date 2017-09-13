'use strict';
module.exports = function(sequelize, DataTypes) {
  var machine = sequelize.define('machine', {
    totalmoney: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return machine;
};
