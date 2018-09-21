import API from '../../api';

export const validateCodeService = (code: string) => {
   return API.fetch('/api/invite/' + code);
};

export const registerUserService = (email: string, username: string, password: string, inviteCode: string) => {
  return API.fetch('/api/register/' + inviteCode, {
    method: 'POST',
    body: {
      email: email,
      username: username,
      password: password,
    }
  });
};
