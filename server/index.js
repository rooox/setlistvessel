const path = require("path");
require("dotenv").config();
const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const ctrl = require("./controller/controller");
const authCtrl = require("./authController");
const session = require("express-session");

const { PORT, CONNECTION_STRING, SECRET, NODE_ENV } = process.env;

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

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

app.use(async (req, res, next) => {
  if (NODE_ENV === "development") {
    let db = req.app.get("db");
    let results = await db.user_check("roen@gmail.com");
    req.session.user = {
      id: results[0].id,
      username: results[0].user_username,
      email: results[0].user_email,
      firstname: results[0].first_name,
      lastname: results[0].last_name,
      phone: results[0].phone
    };
  }
  next();
});
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);
app.get("/api/user/data", authCtrl.userData);
app.get("/api/sets/:id", ctrl.getSets);
app.get("/api/set/:id", ctrl.getSet);
app.get("/api/songs/:id", ctrl.getSongs);
app.post("/api/songs/", ctrl.addSong);
app.put("/api/song", ctrl.updateSong);
app.delete("/api/set/:id", ctrl.deleteSet);
app.delete("/api/song/:id", ctrl.deleteSong);
app.post("/api/setsong/:song_id/:set_id", ctrl.addSetSong);
app.delete("/api/setsong/:song_id/:set_id", ctrl.deleteSetSong);

app.listen(PORT, () => {
  console.log(`The vessel is docked at port ${PORT}`);
});
