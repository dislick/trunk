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

export const addCommentOnServer = async (hash: string, comment: string) => {
  return API.fetch('/api/torrent/detail/comment', {
    method: 'POST',
    body: {
      hash: hash,
      comment: comment,
    }
  });
};

export const updateRatingOnServer = async (hash: string, rating: number) => {
  return API.fetch('/api/torrent/detail/rating', {
    method: 'POST',
    body: {
      hash: hash,
      rating: rating,
    }
  });
};
