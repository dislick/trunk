import { Request, Response } from 'express';
import { createTorrentPost, getTorrentPosts } from '../models/torrent_model';

/**
 * API Endpoint POST /torrent 
 */
export const getTorrents = async (request: Request, response: Response) => {
  let { dateOffset, limit } = request.body;

  // Try to parse it to a Date
  dateOffset = new Date(dateOffset);
  if (!(dateOffset instanceof Date) || isNaN(dateOffset.valueOf())) {
    // If its invalid we are just going to use the current time
    dateOffset = new Date();
  }

  // Check if requested limit is not off-limits (he-he)
  limit = parseInt(limit);
  if (limit < 1 || limit > 101) {
    return response.status(400).send({ message: 'Limit out of bounds (min: 1, max: 100)' });
  }

  let posts = await getTorrentPosts(dateOffset, limit);
  
  response.send(posts);
};

export const uploadTorrent = async (request: Request, response: Response) => {
  const fileUpload = (request as any).files['torrent_file'];
  const { title } = request.body;

  if (fileUpload.length !== 1) {
    return response.status(400).send();
  }

  if (title.length > 100) {
    return response.status(400).send();
  }

  const post = await createTorrentPost(title, response.locals.id, fileUpload[0].buffer);

  response.send({
    hash: post.hash,
  });
};