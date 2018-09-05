import { pool } from "./database";

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
  peerId: string
) => {
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
      peerId
    ]);
};
