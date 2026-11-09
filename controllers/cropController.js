const { Op } = require("sequelize");
const { Crop } = require("../models/associations");
const { ok, fail } = require("../utils/response");
const { logActivity } = require("../utils/crudFactory");
exports.getAll = async (req, res) => {
  try {
    const { status, search, sort = "createdAt", order = "DESC" } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    const crops = await Crop.findAll({ where, order: [[sort, order]] });
    return ok(res, crops);
  } catch (e) { return fail(res, e.message, 500); }
};
exports.getOne = async (req, res) => {
  const crop = await Crop.findByPk(req.params.id);
  return crop ? ok(res, crop) : fail(res, "Crop not found", 404);
};
exports.create = async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, createdBy: req.user.id });
    logActivity(req, "add", "crop", crop.id);
    return ok(res, crop, "Crop added", 201);
  } catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
};
exports.update = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) return fail(res, "Crop not found", 404);
    await crop.update(req.body);
    logActivity(req, "edit", "crop", crop.id);
    return ok(res, crop, "Crop updated");
  } catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
};
exports.remove = async (req, res) => {
  const n = await Crop.destroy({ where: { id: req.params.id } });
  if (!n) return fail(res, "Crop not found", 404);
  logActivity(req, "delete", "crop", req.params.id);
  return ok(res, { id: req.params.id }, "Crop removed");
};