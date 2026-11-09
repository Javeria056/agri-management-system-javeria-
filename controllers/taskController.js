const { Task, Crop } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Task, "task", { include: [Crop] });