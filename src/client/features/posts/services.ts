import API from '../../api';

export const fetchPostsFromServer = async (offset?: Date, searchQuery?: string) => {
  return API.fetch('/api/torrent', {
    method: 'POST',
    body: {
      dateOffset: offset || '',
      limit: 20,
      queryString: searchQuery,
    },
  });
};

export const fetchDetailFromServer = async (hash: string) => {
  return API.fetch('/api/torrent/detail/' + hash);
};

export const addCommentOnServer = async (hash: string, comment: string) => {
  return API.fetch('/api/torrent/detail/comment', {
    method: 'POST',
    body: {
      hash,
      comment,
    },
  });
};

export const updateRatingOnServer = async (hash: string, rating: number) => {
  return API.fetch('/api/torrent/detail/rating', {
    method: 'POST',
    body: {
      hash,
      rating,
    },
  });
};
