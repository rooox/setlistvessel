UPDATE song
SET
song_title= $2,
key= $3,
tuning = $4,
chords = $5,
lyrics = $6
WHERE id = $1