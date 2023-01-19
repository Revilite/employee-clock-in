const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  res.render("homepage");
})

router.get("/login", async (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
})

router.get("/signUp", async (req, res) => {
  res.render("signUp", { loggedIn: req.session.loggedIn });
})

router.get("/clockIn", withAuth, async (req, res) => {
  res.render("clockIn", { loggedIn: req.session.loggedIn });
})
module.exports = router;