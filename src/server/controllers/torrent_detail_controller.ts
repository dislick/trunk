import { Request, Response } from 'express';
import { getCommentsForTorrent, addCommentForTorrent } from '../models/comments_model';
import { getRatingsForTorrent, getAverageRating } from '../models/ratings_model';
import { getFormattedRatio } from '../utils/ratio_calculator';
import { isString } from 'lodash';

export interface CommentDTO {
  content: string;
  timestamp: Date;
  user: {
    user_id: number;
    username: string;
    ratio: string;
  };
}

export interface RatingDTO {
  rating: number;
  timestamp: Date;
  user: {
    user_id: number;
    username: string;
    ratio: string;
  };
}

export interface TorrentDetailDTO {
  comments: CommentDTO[];
  ratings: RatingDTO[];
  averageRating: number;
}

export const getPostDetail = async (request: Request, response: Response) => {
  const { hash } = request.params;

  let [comments, ratings, averageRating] = await Promise.all([
    getCommentsForTorrent(hash),
    getRatingsForTorrent(hash),
    getAverageRating(hash),
  ]);

  response.send({
    comments: comments.map(comment => ({
      content: comment.comment_content,
      timestamp: comment.commented_at,
      user: {
        user_id: comment.user_id,
        username: comment.username,
        ratio: getFormattedRatio(parseInt(comment.total_uploaded), parseInt(comment.total_downloaded))
      }
    })),
    ratings: ratings.map(rating => ({
      rating: rating.rating,
      timestamp: rating.rated_at,
      user: {
        user_id: rating.user_id,
        username: rating.username,
        ratio: getFormattedRatio(parseInt(rating.total_uploaded), parseInt(rating.total_downloaded))
      }
    })),
    averageRating
  });
};

export const postComment = async (request: Request, response: Response) => {
  const { comment, hash } = request.body;

  if (!isString(comment)) {
    return response.status(400).send({ message: 'Comment must be a string' });
  }
  if (comment.length === 0) {
    return response.status(400).send({ message: 'Comment cannot be empty' });
  }
  if (comment.length > 512) {
    return response.status(400).send({ message: 'Comment cannot be over 512 chars' });
  }

  await addCommentForTorrent(hash, response.locals.id, comment);

  response.send({ message: 'Comment posted' });
};
