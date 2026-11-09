const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Maintenance = sequelize.define("Maintenance", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  equipmentId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY },
  description: { type: DataTypes.STRING },
  cost: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  performedBy: { type: DataTypes.STRING(80) },
}, { tableName: "maintenance", timestamps: true });
module.exports = Maintenance;