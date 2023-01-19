const router = require("express").Router();
const User = require("../../models/User");

// Get all users
router.get("/", async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

// Get one user
router.get("/:username", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.params.username } });
    if (!userData) {
      res.status(404).json({ message: "No user with this username" });
      return;
    }

    res.json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// Login User
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password, pleast try again " });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(500).json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() =>{
      req.session.user_id = userData.id;
      req.session.user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      };
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in"});
    });

    

  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.post("/logout", async (req, res) => {
  if(req.session.loggedIn) {
    req.session.destroy(() =>{
      res.status(204).end();
    });
  }
  else{
    res.status(404).end();
  }
})



// Create User
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      userCode: req.body.userCode,
    });
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(400).json(err);
  }
})



module.exports = router;