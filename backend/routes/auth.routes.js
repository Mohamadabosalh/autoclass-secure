const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { access, refresh } = require("../utils/tokens");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ ok: true });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ msg: "invalid" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ msg: "invalid" });

  const accessToken = access(user);
  const refreshToken = refresh(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({ accessToken });
});

module.exports = router;
