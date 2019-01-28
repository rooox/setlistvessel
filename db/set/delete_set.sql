DELETE FROM set
WHERE id = $1;
DELETE FROM set_song
WHERE set_id = $1;