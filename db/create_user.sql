insert into user_info
(user_username, user_email, password_hash, first_name, last_name, phone)
values($1, $2, $3, $4, $5, $6)
returning *
