import * as parseTorrent from 'parse-torrent';
import * as squel from 'squel';
import { NotFoundError } from '../utils/error';
import { getFormattedRatio } from '../utils/ratio_calculator';
import { pool } from './database';

squel.useFlavour('postgres');

export const getTorrentPosts = async (dateOffset: Date, queryString: string = '', limit: number = 20) => {
  let expression = generateExpressionForQueryString(queryString);

  // Add `upload_at` condition for pagination
  expression.and('uploaded_at < ?', dateOffset);

  let param = squel.select({
    numberedParameters: true,
    numberedParametersStartAt: 2, // start at 2 because we need $1 for the LIMIT
  })
  .where(expression)
  .toParam();

  // Remove the SELECT from the generated query because we only care about the
  // WHERE clause
  const whereClause = param.text.replace(/^SELECT/, '');

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
    ${whereClause}
    ORDER BY uploaded_at DESC
    LIMIT $1`;

  let result = await pool.query(query, [limit, ...param.values]);

  let rows: Array<{
    hash: string;
    title: string;
    size: string; // BIGINT will return as string
    uploaded_at: Date,
    tags: string;
    user_id: number;
    username: string;
    total_uploaded: string; // BIGINT will return as string
    total_downloaded: string; // BIGINT will return as string
  }> = result.rows;

  return rows.map((row) => ({
    hash: row.hash,
    title: row.title,
    size: parseInt(row.size, 10),
    uploaded_at: row.uploaded_at,
    tags: row.tags,
    user: {
      id: row.user_id,
      username: row.username,
      ratio: getFormattedRatio(parseInt(row.total_uploaded, 10), parseInt(row.total_downloaded, 10)),
    },
  }));
};

export const createTorrentPost = async (
  title: string,
  userId: number,
  torrentFile: Buffer,
): Promise<{ hash: string }> => {
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
      title: result.rows[0].title,
    };
  } else {
    throw new NotFoundError();
  }
};

function getHexString(buffer: Buffer) {
  // Prepend \x to the hex string of the buffer to tell postgres that the
  // `bytea` type uses hex format instead of the escape format.
  return '\\x' + buffer.toString('hex');
}

const tagMatcher = /^tag:([a-z0-9-]+?)$/i;
const userMatcher = /^user:([a-z0-9-]+?)$/i;
const hashMatcher = /^hash:([a-f0-9]{40})$/;

function generateExpressionForQueryString(query: string) {
  let keywords = query.trim().split(/\s+/).filter((k) => k.length > 0);

  let expression = squel.expr();

  if (keywords.length <= 0) {
    return expression;
  }

  for (let keyword of keywords) {
    if (tagMatcher.test(keyword)) {
      let tag = keyword.match(tagMatcher)[1];

      // We are using a regular expression here to match the concatenated
      // labels. Take the following string for example:
      //
      // linux,ubuntu,distro
      //
      // With the regular expression /(^|,)ubu(,|$)/ we make sure that the
      // queryString `tag:ubu` doesn't match the tag `ubuntu`.
      expression.and(`concatedLables.labels ~ ?`, `(^|,)${tag}(,|$)`);
      continue;
    }
    if (userMatcher.test(keyword)) {
      let user = keyword.match(userMatcher)[1];
      expression.and(`username = ?`, user);
      continue;
    }
    if (hashMatcher.test(keyword)) {
      let hash = keyword.match(hashMatcher)[1];
      expression.and('torrents.hash = ?', hash);
      continue;
    }
    expression.and(`title ILIKE ?`, `%${keyword}%`);
  }

  return expression;
}
