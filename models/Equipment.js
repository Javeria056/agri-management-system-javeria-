const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Equipment = sequelize.define("Equipment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(80), allowNull: false },
  type: { type: DataTypes.STRING(50) },
  purchaseDate: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM("Active", "Under Repair", "Idle"), defaultValue: "Active" },
  lastServiceDate: { type: DataTypes.DATEONLY },
  serviceIntervalDays: { type: DataTypes.INTEGER, defaultValue: 0 },
  notes: { type: DataTypes.STRING },
}, { tableName: "equipment", timestamps: true });
module.exports = Equipment;