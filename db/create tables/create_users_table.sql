CREATE TABLE user_info(
    id SERIAL PRIMARY KEY, 
     user_username VARCHAR(60), 
     user_email VARCHAR(60), 
    password_hash VARCHAR(60), 
    first_name VARCHAR(60), 
    last_name VARCHAR(60), 
    phone VARCHAR(20)
)

user_username, user_email, password_hash, first_name, last_name, phone
create table customer(
    cust_id serial primary key,
    cust_email varchar(180),
    cust_hash text
)


INSERT into user_profile
( user_email, user_username, user_password, first_name, last_name, phone )
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *