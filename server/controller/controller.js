module.exports = {
  async getSets(req, res) {
    let db = req.app.get("db");
    let id = req.session.user.id;
    let results = await db.set.get_sets(id);
    res.status(200).send(results);
  },

  async getSet(req, res) {
    let db = req.app.get("db");
    let id = req.params.id;
    let results = await db.set.get_set(id);
    res.status(200).send(results);
  },

  async getSongs(req, res) {
    let db = req.app.get("db");
    let id = req.session.user.id;
    let results = await db.song.get_songs(id);
    res.status(200).send(results);
  },

  async addSong(req, res) {
    let { id, song_title, key, tuning, chords, lyrics } = req.body.newSong;
    let db = req.app.get("db");
    let [newSong] = await db.add_song([
      id,
      song_title,
      key,
      tuning,
      chords,
      lyrics
    ]);
    res.status(200).send(console.log(newSong));
  },

  async updateSong(req, res) {
    let { id, song_title, key, tuning, chords, lyrics } = req.body.updatedSong;
    let db = req.app.get("db");
    let [updatedSong] = await db.song.update_song([
      id,
      song_title,
      key,
      tuning,
      chords,
      lyrics
    ]);
    res.status(200).send(console.log(updatedSong));
  },

  async deleteSong(req, res) {
    let db = req.app.get("db");
    let id = req.params.id;
    await db.song.delete_song(id);
    res.sendStatus(200);
  },

  async deleteSetSong(req, res) {
    let db = req.app.get("db");
    let song_id = req.params.song_id;
    let set_id = req.params.set_id;
    await db.set.delete_set_song([song_id, set_id]);
    res.sendStatus(200);
  },

  async addSetSong(req, res) {
    let db = req.app.get("db");
    let song_id = req.params.song_id;
    let set_id = req.params.set_id;
    await db.set.add_set_song([song_id, set_id]);
    res.sendStatus(200);
  },

  async createSet(req, res) {
    let { title, id, songs } = req.body.newSet;
    let db = req.app.get("db");
    let [newSet] = await db.set.create_set([title, id, songs]);
    res.status(200).send(console.log(newSet));
  },

  async updateTitle(req, res) {
    let db = req.app.get("db");
    let set_id = req.params.set_id;
    let setTitle = req.body.setTitle;
    await db.set.update_set_title([set_id, setTitle]);
    res.sendStatus(200);
  },

  async deleteSet(req, res) {
    let db = req.app.get("db");
    let set_id = req.params.set_id;
    await db.set.delete_set(set_id);
    res.sendStatus(200);
  }
};
