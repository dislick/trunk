create table "user"
(
	id serial not null
		constraint user_pkey
			primary key,
	username varchar(64) not null,
	password_hash varchar(60) not null,
	torrent_auth_key varchar(128) not null,
	level integer not null,
	email varchar(128) not null,
	ratio numeric(8,2) default 0 not null
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

create table stats
(
	id serial not null
		constraint stats_pkey
			primary key,
	user_id integer not null
		constraint stats_user_id_fk
			references "user"
				on update cascade on delete cascade,
	hash varchar(40) not null,
	uploaded bigint not null,
	downloaded bigint not null,
	peer_id varchar(40) not null,
	constraint stats_user_hash_peer_id_key
		unique (user_id, hash, peer_id)
)
;

create function calculate_ratio() returns trigger
	language plpgsql
as $$
BEGIN
  UPDATE "user"
  SET ratio = (
    select total_upload / total_download as ratio
    from (select
            SUM(uploaded)   as total_upload,
            SUM(downloaded) as total_download
          from stats
          where user_id = new.user_id) as total)
  WHERE id = new.user_id;
  return new;
END;
$$
;

create trigger calc_ratio
	after insert or update
	on stats
	for each row
	execute procedure calculate_ratio()
;

