const router = require("express").Router();
const User = require("../../models/User");

router.get("/", async(req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

module.exports = router;