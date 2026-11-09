const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Buyer = sequelize.define("Buyer", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(80), allowNull: false },
  cnic: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  photoUrl: { type: DataTypes.STRING },
  cropId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  date: { type: DataTypes.DATEONLY },
}, { tableName: "buyers", timestamps: true });
module.exports = Buyer;