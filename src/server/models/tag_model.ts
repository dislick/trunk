import { pool } from './database';

export const createAndLinkTags = async (tagList: string, torrentHash: string) => {
  let tags = parseTagList(tagList);

  // Abort if there are no valid tags
  if (tags.length <= 0) {
    return;
  }

  const selectOrInsertQuery = `
    WITH sel AS (
        SELECT id
        FROM tags
        WHERE label = $1
    ), ins AS (
      INSERT INTO tags (label)
        SELECT $1
        WHERE NOT exists(
            SELECT 1 FROM sel
        )
      RETURNING id
    )
    SELECT id
    FROM ins
    UNION
    SELECT id
    FROM sel`;

  let tagIds: number[] = await Promise.all(tags.map(async (tag) => {
    let result = await pool.query(selectOrInsertQuery, [tag]);
    return result.rows[0].id;
  }));

  // Remove old links
  await removeTagLinks(torrentHash);

  // Create new ones
  await Promise.all(tagIds.map((id) => addTagLink(id, torrentHash)));
};

const removeTagLinks = async (hash: string) => {
  const query = `DELETE FROM tag_torrent_link WHERE torrent = $1`;
  return pool.query(query, [hash]);
};

const addTagLink = async (tagId: number, hash: string) => {
  const query = `INSERT INTO tag_torrent_link (tag_id, torrent) VALUES ($1, $2)`;
  return pool.query(query, [tagId, hash]);
};

export const parseTagList = (tagList: string) => {
  const validateTag = /^[a-z0-9][a-z0-9-]+[a-z0-9]$/;

  return tagList
    .split(',') // Turn string to array
    .map((tag) => tag.toLowerCase()) // Make everything lowercase
    .filter((tag) => validateTag.test(tag)); // Remove invalid tags
};
