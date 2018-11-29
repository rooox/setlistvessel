INSERT INTO set_song ( song_id, set_id )
VALUES( $1, $2)
RETURNING *