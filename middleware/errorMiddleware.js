exports.notFound = (req, res) => res.status(404).json({ succeeded: false, message: "Route not found", data: null });
exports.errorHandler = (err, req, res, next) =>
  res.status(err.status || 400).json({ succeeded: false, message: err.message || "Server error", data: null });