import { pool } from "./database";

interface CommentModel {
  comment_content: string;
  commented_at: Date;
  user_id: number;
  username: string;
  total_uploaded: string;
  total_downloaded: string;
}

export const getCommentsForTorrent = async (hash: string): Promise<CommentModel[]> => {
  const query = `
    SELECT
      comments.comment_content,
      comments.commented_at,
      "user".id AS user_id,
      "user".username,
      "user".total_downloaded,
      "user".total_uploaded
    FROM comments
      INNER JOIN "user" on comments.user_id = "user".id
    WHERE torrent = $1
    ORDER BY comments.commented_at DESC`;
  
  let result = await pool.query(query, [hash]);
  return result.rows;
};
