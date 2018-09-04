import API from '../../api';

export const fetchPostsFromServer = async () => {
  let response = await API.fetch('/posts');
  return response.json();
}
