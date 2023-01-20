const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();

const path = require("path");
const exphbs = require("express-handlebars");



const hbs = exphbs.create();

const sess = {
  secret: process.env.SESSION,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, "0.0.0.0")
})