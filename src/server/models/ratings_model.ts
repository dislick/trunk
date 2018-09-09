import { pool } from "./database";

interface RatingsModel {
  rating: number;
  rated_at: Date;
  user_id: number;
  username: string;
  total_uploaded: string;
  total_downloaded: string;
}

export const getRatingsForTorrent = async (hash: string): Promise<RatingsModel[]> => {
  const query = `
    SELECT
      ratings.rating,
      ratings.rated_at,
      "user".id AS user_id,
        "user".username,
      "user".total_downloaded,
      "user".total_uploaded
    FROM ratings
    INNER JOIN "user" ON ratings.user_id = "user".id
    WHERE ratings.torrent = $1
    ORDER BY ratings.rated_at DESC`;
  
  let result = await pool.query(query, [hash]);
  return result.rows;
};

export const getAverageRating = async (hash: string): Promise<number> => {
  const query = `
    SELECT
      AVG(rating) as average_rating
    FROM ratings
    WHERE torrent = $1`
  
  let result = await pool.query(query, [hash]);
  return parseFloat(result.rows[0].average_rating);
}