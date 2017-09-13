'use strict';
module.exports = function(sequelize, DataTypes) {
  var vendingItems = sequelize.define('vendingItems', {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    desc: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return vendingItems;
};
