const { Income } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Income, "income");