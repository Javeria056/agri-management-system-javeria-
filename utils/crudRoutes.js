const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
module.exports = (c) => {
  const r = express.Router();
  r.use(protect);
  r.get("/", c.getAll); r.get("/:id", c.getOne); r.post("/", c.create);
  r.put("/:id", authorize("admin"), c.update);
  r.delete("/:id", authorize("admin"), c.remove);
  return r;
};