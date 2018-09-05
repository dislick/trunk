import { pool } from "./database";
import * as parseTorrent from 'parse-torrent';

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

function getHexString(buffer: Buffer) {
  // Prepend \x to the hex string of the photo to tell postgres that the
  // `bytea` type uses hex format instead of the escape format.
  return '\\x' + buffer.toString('hex');
}
