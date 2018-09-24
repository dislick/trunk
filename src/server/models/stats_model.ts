import { pool } from './database';

export interface StatsModel {
  id: number;
  user: number;
  hash: string;
  uploaded: number;
  downloaded: number;
  peer_id: string;
}

export const updateStatistics = async (
  userId: number,
  hash: string,
  uploaded: number,
  downloaded: number,
  peerId: string,
) => {
  // Ignore announce message if there hasn't been any data transferred yet. It
  // would not have an impact on the users ratio and just unnecessarily clogs
  // the database.
  if (uploaded === 0 && downloaded === 0) {
    return;
  }

  // This query triggers a postges trigger which updates the columns `ratio`,
  // `total_uploaded` and `total_downloaded` in the user table.
  const query = `
    INSERT INTO stats (user_id, hash, uploaded, downloaded, peer_id)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id, hash, peer_id)
      DO UPDATE
        SET
          uploaded = excluded.uploaded,
          downloaded = excluded.downloaded;
    `;

  await pool.query(query, [
    userId,
    hash,
    uploaded,
    downloaded,
    peerId,
  ]);
};
