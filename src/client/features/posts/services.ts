import API from '../../api';

export const fetchPostsFromServer = async () => {
  let response = await API.fetch('/api/posts');
  return response.json();
}
