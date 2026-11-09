const { Activity } = require("../models/associations");
const { ok, fail } = require("./response");
const logActivity = (req, action, entity, entityId) =>
  Activity.create({ user: req.user.username, action, entity, entityId }).catch(() => {});
const crudFactory = (Model, entity, options = {}) => ({
  getAll: async (req, res) => {
    try { return ok(res, await Model.findAll({ include: options.include || [], order: [["createdAt", "DESC"]] })); }
    catch (e) { return fail(res, e.message, 500); }
  },
  getOne: async (req, res) => {
    const row = await Model.findByPk(req.params.id, { include: options.include || [] });
    return row ? ok(res, row) : fail(res, entity + " not found", 404);
  },
  create: async (req, res) => {
    try { const row = await Model.create({ ...req.body, createdBy: req.user.id });
          logActivity(req, "add", entity, row.id); return ok(res, row, entity + " added", 201); }
    catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
  },
  update: async (req, res) => {
    try { const row = await Model.findByPk(req.params.id); if (!row) return fail(res, entity + " not found", 404);
          await row.update(req.body); logActivity(req, "edit", entity, row.id); return ok(res, row, entity + " updated"); }
    catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
  },
  remove: async (req, res) => {
    const n = await Model.destroy({ where: { id: req.params.id } });
    if (!n) return fail(res, entity + " not found", 404);
    logActivity(req, "delete", entity, req.params.id); return ok(res, { id: req.params.id }, entity + " removed");
  },
});
module.exports = crudFactory;
