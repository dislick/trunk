import { Server } from 'bittorrent-tracker';
import { Request, Response } from 'express';
import { config } from './config';
import { updateStatistics } from './models/stats_model';
import { findUserByTorrentKey } from './models/user_model';

interface AnnounceParams {
  info_hash: string;
  peer_id: string;
  port: number;
  uploaded: number;
  downloaded: number;
  left: number;
  corrupt: number;
  ip: string;
  addr: string;
  httpReq: Request;
  httpRes: Response;
}

export default () => {
  const server = new Server({
    udp: false,
    http: true,
    ws: false,
    stats: false,
    trustProxy: config.trustXForwardedFor,
    filter: async (infoHash: string, params: AnnounceParams, cb: (error: Error) => void) => {
      try {
        const user = await findUserByTorrentKey(params.httpRes.locals.torrentKey);
        updateStatistics(user.id, infoHash, params.uploaded, params.downloaded, params.peer_id);
        cb(null);
      } catch (error) {
        cb(new Error('Invalid auth key'));
      }
    },
  });

  server.on('error', (error) => console.log('error', error));
  server.on('warning', (error) => console.log('warning', error));

  server.listen(config.trackerPort);

  // These are probably useless
  // server.on('start', function (addr) {
  //   console.log('start', addr);
  // });
  // server.on('complete', (addr) => console.log('complete', addr));
  // server.on('update', (addr) => console.log('update', addr));
  // server.on('stop', (addr) => console.log('stop', addr));

  return server;
};
