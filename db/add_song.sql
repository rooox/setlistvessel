INSERT INTO song ( user_id, song_title, key, tuning, chords, lyrics )
VALUES( $1, $2, $3, $4, $5, $6)
RETURNING *