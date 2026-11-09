const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(100), allowNull: false },
  type: { type: DataTypes.ENUM("Irrigation", "Fertilizer", "Spraying", "Labour"), allowNull: false },
  cropId: { type: DataTypes.INTEGER },
  dueDate: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.ENUM("Pending", "Done", "Overdue"), defaultValue: "Pending" },
}, { tableName: "tasks", timestamps: true });
module.exports = Task;