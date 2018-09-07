import API from '../../api';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';

export const fetchPostsFromServer = async () => {
  return API.fetch('/api/torrent', {
    method: 'POST',
    body: {
      dateOffset: '',
      limit: 30,
    }
  });
}
