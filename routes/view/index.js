const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("homepage");
})

router.get("/signUp", async (req, res) => {
  res.render("signIn");
})

module.exports = router;