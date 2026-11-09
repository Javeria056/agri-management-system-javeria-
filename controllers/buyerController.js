const { Buyer, Crop } = require("../models/associations");
const { ok, fail } = require("../utils/response");
const { logActivity } = require("../utils/crudFactory");
exports.getAll = async (req, res) => {
  try { return ok(res, await Buyer.findAll({ include: [Crop], order: [["createdAt", "DESC"]] })); }
  catch (e) { return fail(res, e.message, 500); }
};
exports.getOne = async (req, res) => {
  const row = await Buyer.findByPk(req.params.id, { include: [Crop] });
  return row ? ok(res, row) : fail(res, "Buyer not found", 404);
};
exports.create = async (req, res) => {
  try {
    const photoUrl = req.file ? `/Images/${req.file.filename}` : null;
    const row = await Buyer.create({ ...req.body, photoUrl, createdBy: req.user.id });
    logActivity(req, "add", "buyer", row.id);
    return ok(res, row, "Buyer added", 201);
  } catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
};
exports.update = async (req, res) => {
  try {
    const row = await Buyer.findByPk(req.params.id);
    if (!row) return fail(res, "Buyer not found", 404);
    if (req.file) req.body.photoUrl = `/Images/${req.file.filename}`;
    await row.update(req.body);
    logActivity(req, "edit", "buyer", row.id);
    return ok(res, row, "Buyer updated");
  } catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
};
exports.remove = async (req, res) => {
  const n = await Buyer.destroy({ where: { id: req.params.id } });
  if (!n) return fail(res, "Buyer not found", 404);
  logActivity(req, "delete", "buyer", req.params.id);
  return ok(res, { id: req.params.id }, "Buyer removed");
};