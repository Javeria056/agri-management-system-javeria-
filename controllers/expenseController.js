const { Expense, Crop } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Expense, "expense", { include: [Crop] });