const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  res.json(await Product.find());
});

router.post("/", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

module.exports = router;
