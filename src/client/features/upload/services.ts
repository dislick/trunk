import API from '../../api';
import { TorrentResponseDTO } from '../../../server/controllers/torrent_controller';

export const uploadTorrentFile = async (formData: FormData) => {
  return API.fetch('/api/torrent', {
    method: 'PUT',
    body: formData,
    isFormData: true,
  });
}
