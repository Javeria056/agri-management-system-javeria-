const { Maintenance, Equipment } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Maintenance, "maintenance", { include: [Equipment] });