CREATE TABLE set (
id SERIAL PRIMARY KEY,
title VARCHAR(60),
user_id INTEGER REFERENCES users)