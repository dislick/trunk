import API from '../../api';

export const fetchPostsFromServer = async () => {
  return API.fetch('/api/torrent', {
    method: 'POST',
    body: {
      dateOffset: '',
      limit: 30,
    }
  });
};

export const fetchDetailFromServer = async (hash: string) => {
  return API.fetch('/api/torrent/detail/' + hash);
};
