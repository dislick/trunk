import { pool } from "./database";
import * as parseTorrent from 'parse-torrent';
import { getFormattedRatio } from "../utils/ratio_calculator";
import { NotFoundError } from "../utils/error";

interface TorrentPost {
  hash: string;
  title: string;
  size: string; // BIGINT will return as string
  user_id: number;
  uploaded_at: Date;
  torrent_file: Buffer;
}

export const getTorrentPosts = async (dateOffset: Date, limit: number = 20) => {
  const query = `
    SELECT
      torrents.hash,
      torrents.title,
      torrents.size,
      torrents.uploaded_at,
      concatedLables.labels AS tags,
      "user".id             AS user_id,
      "user".username,
      "user".total_downloaded,
      "user".total_uploaded
    FROM
      (SELECT
        torrents.hash,
        string_agg("tags".label, ',') AS labels
      FROM torrents
        LEFT JOIN "tag_torrent_link" t2 ON torrents.hash = t2.torrent
        LEFT JOIN "tags" on t2.tag_id = "tags".id
      GROUP BY torrents.hash
      ) concatedLables
      INNER JOIN torrents ON torrents.hash = concatedLables.hash
      INNER JOIN "user" ON torrents.user_id = "user".id
    WHERE uploaded_at < $1
    ORDER BY uploaded_at DESC
    LIMIT $2`;

  let result = await pool.query(query, [dateOffset, limit]);

  let rows: {
    hash: string;
    title: string;
    size: string; // BIGINT will return as string
    uploaded_at: Date,
    tags: string;
    user_id: number;
    username: string;
    total_uploaded: string; // BIGINT will return as string
    total_downloaded: string; // BIGINT will return as string
  }[] = result.rows;

  return rows.map(row => ({
    hash: row.hash,
    title: row.title,
    size: parseInt(row.size),
    uploaded_at: row.uploaded_at,
    tags: row.tags,
    user: {
      id: row.user_id,
      username: row.username,
      ratio: getFormattedRatio(parseInt(row.total_uploaded), parseInt(row.total_downloaded))
    }
  }))
}

export const createTorrentPost = async (title: string, userId: number, torrentFile: Buffer): Promise<{ hash: string }> => {
  let torrentInfo = parseTorrent(torrentFile);

  const query = `
    INSERT INTO "torrents" (hash, title, size, user_id, torrent_file, uploaded_at)
    VALUES ($1, $2, $3, $4, $5, NOW())`;

  await pool.query(query, [
    torrentInfo.infoHash,
    title,
    torrentInfo.length,
    userId,
    getHexString(torrentFile),
  ]);

  return { hash: torrentInfo.infoHash };
};

export const getTorrentFile = async (hash: string): Promise<{ file: Buffer, title: string }> => {
  const query = `SELECT torrent_file, title FROM torrents WHERE hash = $1`;

  let result = await pool.query(query, [hash]);

  if (result.rows.length === 1) {
    return {
      file: result.rows[0].torrent_file,
      title: result.rows[0].title
    };
  } else {
    throw new NotFoundError();
  }
};

function getHexString(buffer: Buffer) {
  // Prepend \x to the hex string of the photo to tell postgres that the
  // `bytea` type uses hex format instead of the escape format.
  return '\\x' + buffer.toString('hex');
}
