import { config } from '../config';

export const buildAnnounceUrl = (torrentAuthKey: string) => {
  return config.announceUrlBase + '/' + torrentAuthKey + '/announce';
};
