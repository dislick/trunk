import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';
import API from '../../api';

export const uploadTorrentFile = async (formData: FormData) => {
  return API.fetch('/api/torrent', {
    method: 'PUT',
    body: formData,
    isFormData: true,
  });
};
