const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Activity = sequelize.define("Activity", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user: { type: DataTypes.STRING(80) },
  action: { type: DataTypes.ENUM("add", "edit", "delete") },
  entity: { type: DataTypes.STRING(50) },
  entityId: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "activities", timestamps: true });
module.exports = Activity;