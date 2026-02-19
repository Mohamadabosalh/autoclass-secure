const jwt = require("jsonwebtoken");

exports.access = (u) =>
  jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: "15m" });

exports.refresh = (u) =>
  jwt.sign({ id: u._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
