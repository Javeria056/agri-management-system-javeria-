const { Inventory } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Inventory, "inventory");