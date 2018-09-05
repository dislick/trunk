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
	total_uploaded bigint default 0 not null,
	total_downloaded bigint default 0 not null
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

create table torrents
(
	hash varchar(40) not null
		constraint torrents_pkey
			primary key,
	title varchar(100) not null,
	size bigint not null,
	uploaded_at timestamp not null,
	user_id integer not null
		constraint torrents_user_id_fk
			references "user"
				on update cascade on delete cascade,
	torrent_file bytea not null
)
;

create function calculate_ratio() returns trigger
	language plpgsql
as $$
DECLARE
  total_upload BIGINT;
  total_download BIGINT;
BEGIN
  select into total_upload SUM(uploaded) from stats WHERE user_id = new.user_id;
  select into total_download SUM(downloaded) from stats WHERE user_id = new.user_id;

  UPDATE "user"
    SET
      total_uploaded = total_upload,
      total_downloaded = total_download
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

