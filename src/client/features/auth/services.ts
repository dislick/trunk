import API from '../../api';

export const loginUser = async (user: string, password: string) => {
   let response = await API.fetch('/api/login', {
    method: 'POST',
    body: {
      username: user,
      password: password,
    }
  });
  let body: { auth: boolean; token: string } = await response.json();
  return body;
};

export const logoutUser = async () => {
  let response = await API.fetch('/api/logout');
};
