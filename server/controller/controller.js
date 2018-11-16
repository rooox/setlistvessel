module.exports = {
  async getSets(req, res) {
    let db = req.app.get("db");
    let id = req.params.id;
    let results = await db.set.get_sets(id);
    res.status(200).send(results);
  },

  async getSongs(req, res) {
    let db = req.app.get("db");
    let id = req.params.id;
    let results = await db.song.get_songs(id);
    res.status(200).send(results);
  },

  async addSong(req, res) {
    let { id, title, key, tuning, chords, lyrics } = req.body.newSong;
    let db = req.app.get("db");
    let [newSong] = await db.add_song([id, title, key, tuning, chords, lyrics]);
    res.status(200).send(console.log(newSong));
  }
};
// async addGames(req, res) {
//        let db = req.app.get('db')
//        let gameId = req.params.id
//        let userId = req.session.user.id;
//        let results = await db.add_game_list(gameId, userId)
//        res.status(200).send(results)

// async myGames(req, res) {
//        let db = req.app.get('db')
//        let id = req.params.id
//        let results = await db.owned_list(id)
//        res.status(200).send(results)
