import { Request, Response } from 'express';
import { createTorrentPost } from '../models/torrent_model';

/**
 * API Endpoint GET /torrent 
 */
export const getTorrents = async (request: Request, response: Response) => {
  response.send({ userId: response.locals });
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