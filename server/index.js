require("dotenv").config();
const express = require("express");
const session = require();
const PORT = 4242;
const massive = require("massive");
const bodyParser = require("body-parser");
const ctrl = require("./controller");

const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Connected to the db");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`The vessel is docked at port ${PORT}`);
});
