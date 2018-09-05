import API from '../../api';

export const fetchPostsFromServer = async () => {
  let response = await API.fetch('/api/torrent');
  return response.json();
}
