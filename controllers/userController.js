const { Op } = require("sequelize");
const { User } = require("../models/associations");
const generateToken = require("../utils/generateToken");
const { ok, fail } = require("../utils/response");
const safe = (u) => ({ id: u.id, fullName: u.fullName, username: u.username, email: u.email, role: u.role });
exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password) return fail(res, "All fields are required");
    if (password.length < 6) return fail(res, "Password must be at least 6 characters");
    const exists = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
    if (exists) return fail(res, "Username or email already in use", 409);
    const user = await User.create({ fullName, username, email, password, role: "manager" });
    return ok(res, safe(user), "Account created. Please log in.", 201);
  } catch (e) { return fail(res, e.errors?.[0]?.message || e.message, 500); }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return fail(res, "Username and password are required");
    const user = await User.findOne({ where: { [Op.or]: [{ username }, { email: username }] } });
    if (!user || !(await user.matchPassword(password))) return fail(res, "Invalid username or password", 401);
    return res.json({ succeeded: true, message: "Login successful", user: { ...safe(user), token: generateToken(user) } });
  } catch (e) { return fail(res, e.message, 500); }
};
exports.me = async (req, res) => ok(res, safe(req.user));
exports.logout = async (req, res) => ok(res, null, "Logged out");
exports.getAllUsers = async (req, res) => {
  try { const users = await User.findAll({ attributes: { exclude: ["password"] }, order: [["createdAt", "DESC"]] });
        return ok(res, { users }); } catch (e) { return fail(res, e.message, 500); }
};
exports.getUser = async (req, res) => {
  const u = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
  return u ? ok(res, u) : fail(res, "User not found", 404);
};
exports.createUser = async (req, res) => {
  try { const u = await User.create(req.body); return ok(res, safe(u), "User created", 201); }
  catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
};
exports.updateUser = async (req, res) => {
  try { const u = await User.findByPk(req.params.id); if (!u) return fail(res, "User not found", 404);
        await u.update(req.body); return ok(res, safe(u), "User updated"); }
  catch (e) { return fail(res, e.errors?.[0]?.message || e.message); }
};
exports.removeUser = async (req, res) => {
  if (req.params.id === req.user.id) return fail(res, "You cannot delete your own account");
  const n = await User.destroy({ where: { id: req.params.id } });
  return n ? ok(res, { id: req.params.id }, "User removed") : fail(res, "User not found", 404);
};