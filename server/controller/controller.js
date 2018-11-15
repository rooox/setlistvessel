module.exports = {
  getSets: (req, res) => {
    let db = req.app.get("db");
    db.set
      .get_sets()
      .then(sets => res.status(200).send(sets))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getSongs: (req, res) => {
    let db = req.app.get("db");
    db.song
      .get_songs()
      .then(songs => res.status(200).send(songs))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
