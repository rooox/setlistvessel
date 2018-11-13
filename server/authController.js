const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    let { email, password } = req.body;
    let db = req.app.get("db");
    let foundUser = await db.user_check([email]);
    if (foundUser[0]) return res.status(200).send("Email already in use.");
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let [createdUser] = await db.create_user([email, hash]);
    console.log(createdUser);
    req.session.user = { email: createdUser.user_email };
    res.status(200).send({ message: "LoggedIn" });
  },

  login: async (req, res) => {
    let { email, password } = req.body;
    let db = req.app.get("db");
    let [foundUser] = await db.user_check([email]);
    if (foundUser) {
      let result = bcrypt.compareSync(password, foundUser.user_hash); // compare synce returns true or false
      if (result) {
        req.session.user = { email: foundUser.user_email };
        res.status(200).send({ message: "loggedIn" });
      } else {
        res.status(401).send({ message: "Password is incorrect" });
      }
    } else {
      res.status(400).send({ message: "Email not found." });
    }
  },

  userData: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("please log in");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("Logged out");
    // res.redirect("http://localhost:4000");
  }
};
