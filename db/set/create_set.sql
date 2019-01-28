INSERT INTO set (title, user_id) VALUES ($1, $2);
INSERT INTO set_song (set_id, song_id) VALUES(currval('set_id_seq'), UNNEST($3));