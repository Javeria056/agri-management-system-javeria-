const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inventory = sequelize.define('Inventory', {
  itemName: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  quantity: { type: DataTypes.FLOAT },
  unit: { type: DataTypes.STRING }
});

module.exports = Inventory;