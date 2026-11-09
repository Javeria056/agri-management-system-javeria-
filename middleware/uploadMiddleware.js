const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../public/Images")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + Math.round(Math.random() * 1e6) + path.extname(file.originalname)),
});
const fileFilter = (req, file, cb) =>
  ["image/jpeg", "image/png"].includes(file.mimetype) ? cb(null, true) : cb(new Error("Only JPG or PNG images are allowed"));
module.exports = multer({ storage, fileFilter, limits: { fileSize: 1 * 1024 * 1024 } });