create table "user"
(
	id serial not null
		constraint user_pkey
			primary key,
	username varchar(64) not null,
	password_hash varchar(60) not null,
	torrent_auth_key varchar(128) not null,
	level integer not null,
	email varchar(128) not null
)
;

create unique index user_torrent_auth_key_uindex
	on "user" (torrent_auth_key)
;

create unique index user_username_uindex
	on "user" (username)
;

create unique index user_email_uindex
	on "user" (email)
;

create table invite
(
	invite_code varchar(128) not null
		constraint invite_pkey
			primary key,
	from_user integer not null
		constraint invite_user_id_fk
			references "user"
				on update cascade on delete cascade,
	is_claimed boolean not null,
	claimed_at timestamp,
	claimed_by integer
		constraint invite_user_id_fk_2
			references "user"
				on update cascade on delete cascade
)
;

