CREATE TABLE public."user"
(
    id serial PRIMARY KEY,
    username varchar(64) NOT NULL,
    password_hash varchar(60) NOT NULL,
    torrent_auth_key varchar(128) NOT NULL,
    level int NOT NULL
);
CREATE UNIQUE INDEX user_torrent_auth_key_uindex ON public."user" (torrent_auth_key);
CREATE UNIQUE INDEX user_username_uindex ON public."user" (username);
CREATE UNIQUE INDEX user_email_uindex ON public."user" (email);