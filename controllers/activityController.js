const { Activity } = require("../models/associations");
const { ok, fail } = require("../utils/response");
exports.getAll = async (req, res) => {
  try { return ok(res, await Activity.findAll({ order: [["timestamp", "DESC"]], limit: 100 })); }
  catch (e) { return fail(res, e.message, 500); }
};
exports.getOne = async (req, res) => {
  const row = await Activity.findByPk(req.params.id);
  return row ? ok(res, row) : fail(res, "Activity not found", 404);
};
exports.create = async (req, res) => fail(res, "Activities are created automatically", 405);
exports.update = async (req, res) => fail(res, "Activities cannot be edited", 405);
exports.remove = async (req, res) => {
  const n = await Activity.destroy({ where: { id: req.params.id } });
  return n ? ok(res, { id: req.params.id }, "Activity removed") : fail(res, "Activity not found", 404);
};