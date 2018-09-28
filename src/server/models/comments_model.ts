import { pool } from './database';

interface CommentModel {
  comment_content: string;
  commented_at: Date;
  user_id: number;
  username: string;
  total_uploaded: string;
  total_downloaded: string;
}

export interface CommentPreviewDTO {
  comments: Array<{
    username: string;
    comment_content: string;
    commented_at: string;
  }>;
  hasMoreComments: boolean;
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

export const addCommentForTorrent = async (hash: string, userId: number, comment: string) => {
  const query = `
    INSERT INTO comments (
      torrent,
      user_id,
      comment_content,
      commented_at
    )
    VALUES ($1, $2, $3, NOW())`;

  return pool.query(query, [hash, userId, comment]);
};

export const getCommentPreviewForPost = async (hash: string, amount: number = 3): Promise<CommentPreviewDTO> => {
  const query = `
    SELECT
      u.username,
      comment_content,
      commented_at
    FROM comments
      INNER JOIN "user" u on comments.user_id = u.id
    WHERE torrent = $1
    ORDER BY commented_at DESC
    LIMIT $2
  `;

  let result = await pool.query(query, [hash, amount + 1]);

  const hasMoreComments = result.rows.length > amount;
  const comments = result.rows.slice(0, 3).reverse();

  return {
    comments,
    hasMoreComments,
  };
};
