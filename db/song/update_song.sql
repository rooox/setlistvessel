UPDATE song
SET
title= $2,
tuning = $3,
chords = $4,
lyrics = $5,
user_id = $6
WHERE id = $1