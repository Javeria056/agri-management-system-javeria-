const { Attendance, Worker } = require("../models/associations");
module.exports = require("../utils/crudFactory")(Attendance, "attendance", { include: [Worker] });