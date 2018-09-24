import API from '../../api';

export const loginUser = (user: string, password: string) => {
   return API.fetch('/api/login', {
    method: 'POST',
    body: {
      username: user,
      password,
    },
  });
};

export const logoutUser = async () => {
  let response = await API.fetch('/api/logout');
};

export const getPersonalInfo = async () => {
  return API.fetch('/api/me');
};
