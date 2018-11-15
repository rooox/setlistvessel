SELECT * FROM song
JOIN set_song ON song.id = set_song.song_id
JOIN set ON set.id = set_song.set_id
WHERE set_song.set_id= $1