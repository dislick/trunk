import API from '../../api';

export const fetchPostsFromServer = async (offset?: Date) => {
  return API.fetch('/api/torrent', {
    method: 'POST',
    body: {
      dateOffset: offset || '',
      limit: 20,
    }
  });
};

export const fetchDetailFromServer = async (hash: string) => {
  return API.fetch('/api/torrent/detail/' + hash);
};
