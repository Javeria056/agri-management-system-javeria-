const { Equipment } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Equipment, "equipment");