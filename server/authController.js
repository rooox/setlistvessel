const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    let { username, email, password, firstname, lastname, phone } = req.body;
    let db = req.app.get("db");
    let foundUser = await db.user_check([email]);
    if (foundUser[0]) return res.status(200).send("Email already in use.");
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let [createdUser] = await db.create_user([
      username,
      email,
      hash,
      firstname,
      lastname,
      phone
    ]);
    req.session.user = {
      id: createdUser.id,
      username: createdUser.user_username,
      email: createdUser.user_email,
      firstname: createdUser.first_name,
      lastname: createdUser.last_name,
      phone: createdUser.phone
    };
    res.status(200).send({ message: "Logged in" });
  },

  login: async (req, res) => {
    let { email, password } = req.body;
    let db = req.app.get("db");
    let [foundUser] = await db.user_check([email]);
    if (foundUser) {
      let result = bcrypt.compareSync(password, foundUser.password_hash); // compare synce returns true or false
      if (result) {
        req.session.user = {
          id: foundUser.id,
          username: foundUser.user_username,
          email: foundUser.user_email,
          firstname: foundUser.first_name,
          lastname: foundUser.last_name,
          phone: foundUser.phone
        };

        res.status(200).send({ message: "Logged in", user: req.session.user });
        console.log("session.user", req.session.user);
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
