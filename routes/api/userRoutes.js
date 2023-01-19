const router = require("express").Router();
const User = require("../../models/User");
4
router.get("/", async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

router.get("/:username", async (req, res) => {
  try {
    const userData = await User.findOne({where: {username: req.params.username}});
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

router.post("/login", async (req, res) =>{
  try{
    const userData = await User.findOne({where: {username: req.body.username}});
    if(!userData){
      res.status(400).json({ message: "Incorrect email or password, pleast try again "});
      return;
    }
    console.log(userData.password);
    if(req.body.password != userData.password){
      res.status(400).json({ message: "incorrect username or password"});
    }
    
    else{
      res.status(200).json(userData);
    }

  }
  catch(err){
    res.status(500).json(err);
  }
})


router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name,
      user_code: req.body.user_code,
    });
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;