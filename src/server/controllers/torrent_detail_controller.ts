import { Request, Response } from 'express';
import { getCommentsForTorrent, addCommentForTorrent } from '../models/comments_model';
import { getRatingsForTorrent, getAverageRating, getRatingForUser } from '../models/ratings_model';
import { getFormattedRatio } from '../utils/ratio_calculator';
import { isString, isNumber } from 'lodash';
import { upsertRating } from '../models/ratings_model';

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
  myRating: number;
}

export const getPostDetail = async (request: Request, response: Response) => {
  const { hash } = request.params;

  let [comments, ratings, averageRating, myRating] = await Promise.all([
    getCommentsForTorrent(hash),
    getRatingsForTorrent(hash),
    getAverageRating(hash),
    getRatingForUser(hash, response.locals.id),
  ]);

  let dto: TorrentDetailDTO = {
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
    averageRating,
    myRating,
  };

  response.send(dto);
};

/**
 * API Endpoint /api/torrent/detail/comment 
 */
export const postComment = async (request: Request, response: Response) => {
  const { hash, comment } = request.body;

  if (!isString(comment)) {
    return response.status(400).send({ message: 'Comment must be a string' });
  }
  if (comment.length === 0) {
    return response.status(400).send({ message: 'Comment cannot be empty' });
  }
  if (comment.length > 512) {
    return response.status(400).send({ message: 'Comment cannot be over 512 chars' });
  }

  try {
    await addCommentForTorrent(hash, response.locals.id, comment);
  } catch (error) {
    response.status(500).send();
  }

  response.send({ message: 'Comment posted' });
};

/**
 * API Endpoint /api/torrent/detail/rating 
 */
export const postRating = async (request: Request, response: Response) => {
  let { hash, rating } = request.body;
  
  if (!isNumber(rating)) {
    return response.status(400).send({ message: 'Rating must be a number' });
  }

  // Make sure that the user can only post integrs
  rating = Math.floor(rating);

  if (rating < 1 || rating > 5) {
    return response.status(400).send({ message: 'Rating must be between 1 and 5' });
  }

  try {
    await upsertRating(hash, response.locals.id, rating);
  } catch (error) {
    response.status(500).send();
  }

  response.send({ message: 'Rating posted' });
};
