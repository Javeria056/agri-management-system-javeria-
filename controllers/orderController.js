const { Order, Crop } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Order, "order", { include: [Crop] });