import * as RSSFeed from 'bittorrent-rss-feed';
import { Request, Response } from 'express';
import { config } from '../config';
import { getRssTorrents } from '../models/torrent_model';
import { findUserByTorrentKey } from '../models/user_model';
import { downloadTorrent } from './torrent_controller';

export const getRSSFeed = async (request: Request, response: Response) => {
  const { torrentKey, user, tag } = request.params;

  // Authenticate the user
  try {
    await findUserByTorrentKey(torrentKey);
  } catch (error) {
    return response.status(401).end();
  }

  let feed = new RSSFeed({
    title: 'trunk',
    link: config.announceUrlBase,
    ttl: 30,
    description: `Customizable trunk RSS feed`,
  });

  let torrents = await getRssTorrents(user, tag);

  for (let torrent of torrents) {
    feed.addItem({
      title: torrent.title,
      pubDate: torrent.uploaded_at,
      hash: torrent.hash,
      description: `New download: ${torrent.title}`,
      torrentFileUrl: buildTorrentDownloadUrl(torrentKey, torrent.hash),
      torrentFileLength: parseInt(torrent.size, 10),
    });
  }

  response.setHeader('Content-Type', 'text/xml; charset=UTF-8');
  response.send(feed.getXML());
};

/**
 * With this endpoint it is possible to download a torrent file without needing
 * to provide a JWT token but a torrentKey. This is required for RSS download
 * links.
 */
export const rssDownloadTorrent = async (request: Request, response: Response) => {
  const { torrentKey } = request.params;

  try {
    let user = await findUserByTorrentKey(torrentKey);
    response.locals.id = user.id;
    downloadTorrent(request, response);
  } catch (error) {
    response.status(401).end();
  }
};

function buildTorrentDownloadUrl(torrentKey: string, hash: string) {
  return `${config.announceUrlBase}/rss-download/${torrentKey}/${hash}`;
}
