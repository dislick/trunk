import { Request, Response } from 'express';
import { createTorrentPost, getTorrentPosts, getTorrentFile } from '../models/torrent_model';
import * as parseTorrent from 'parse-torrent';
import { NotFoundError } from '../utils/error';
import { findUser } from '../models/user_model';
import { config } from '../config';
import { buildAnnounceUrl } from '../utils/build_announce_url';
import { createAndLinkTags } from '../models/tag_model';

export interface TorrentResponseDTO {
  hash: string;
  title: string;
  size: number;
  uploaded_at: Date;
  tags: string;
  user: {
    id: number;
    username: string;
    ratio: string;
  };
  seeders: number;
  leechers: number;
}

/**
 * API Endpoint POST /torrent 
 */
export const getTorrents = (trackingServer) => async (request: Request, response: Response) => {
  let { dateOffset, limit } = request.body;

  // Try to parse it to a Date
  dateOffset = new Date(dateOffset);
  if (!(dateOffset instanceof Date) || isNaN(dateOffset.valueOf())) {
    // If its invalid we are just going to use the current time
    dateOffset = new Date();
  }

  // Check if requested limit is not off-limits (he-he)
  limit = parseInt(limit) || 20;
  if (limit < 1 || limit > 101) {
    return response.status(400).send({ message: 'Limit out of bounds (min: 1, max: 100)' });
  }

  console.log(request.body, dateOffset, limit);

  let posts = await getTorrentPosts(dateOffset, limit);

  let responseDTOs: TorrentResponseDTO[] = posts.map(post => {
    const { seeders, leechers } = getSwarmInfo(trackingServer, post.hash);
    return {
      ...post,
      seeders: seeders,
      leechers: leechers,
    }
  });

  response.send(responseDTOs);
};

export const uploadTorrent = async (request: Request, response: Response) => {
  const fileUpload = (request as any).files['torrent_file'];
  const { title, tags } = request.body;

  if (!fileUpload || fileUpload.length !== 1) {
    return response.status(400).send({ message: 'File in field torrent_file not found'});
  }

  if (title.length < 3) {
    return response.status(400).send({ message: 'Title has to be at least 3 characters' });
  }

  if (title.length > 100) {
    return response.status(400).send({ message: 'Title is over 100 characters' });
  }

  try {
    const post = await createTorrentPost(title, response.locals.id, fileUpload[0].buffer);
    await createAndLinkTags(tags, post.hash);

    response.send({
      hash: post.hash,
    });
  } catch (error) {
    if (error.toString().indexOf('duplicate key') !== -1) {
      return response.status(400).send({ message: 'Duplicate torrent' });
    }
    console.log(error);
    response.status(500).send();
  }
};

export const downloadTorrent = async (request: Request, response: Response) => {
  const { hash } = request.params;

  try {
    let [ torrent, user] = await Promise.all([
      getTorrentFile(hash),
      findUser(response.locals.id)
    ]);

    // Replace tracker with customized URL by parsing the file buffer, changing
    // the `announce` field and encoding it again.
    let parsed = parseTorrent(torrent.file);
    parsed.announce = [
      buildAnnounceUrl(user.torrent_auth_key)
    ];
    parsed.private = true; // Let's not enable peer discovery services, ok?
    torrent.file = parseTorrent.toTorrentFile(parsed);

    // These headers should be present for a proper file download
    response.setHeader('Content-Type', 'application/x-bittorrent');
    response.setHeader('Content-Disposition', `attachment; filename="${torrent.title}.torrent"`)
    response.setHeader('Content-Length', torrent.file.length);
    response.send(torrent.file);
  } catch (error) {
    console.log(error);
    if (error instanceof NotFoundError) {
      response.status(404).send({ message: 'File could not be found' });
    } else {
      response.status(500).send();
    }
  }
};

const getSwarmInfo = (trackingServer, hash: string): { seeders: number, leechers: number } => {
  const torrent = trackingServer.torrents[hash];

  if (torrent) {
    return { seeders: torrent.complete, leechers: torrent.incomplete };
  } else {
    return {  seeders: 0, leechers: 0 };
  }
};