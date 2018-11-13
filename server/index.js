require("dotenv").config();
const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
// const ctrl = require("./controller/controller");
const authCtrl = require("./authController");
const session = require("express-session");

const { PORT, CONNECTION_STRING, SECRET } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Connected to the db");
  })
  .catch(err => {
    console.log(err);
  });

app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);
app.get("/api/user/data", authCtrl.userData);

app.listen(PORT, () => {
  console.log(`The vessel is docked at port ${PORT}`);
});
