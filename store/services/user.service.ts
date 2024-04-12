import { postAxios } from './api';

const login = (params) => {
  return postAxios('/api/auth/login', params);
};

const register = (params) => {
  return postAxios('/api/auth/register', params)
    .then((res) => res)
    .catch((err) => Promise.reject(err));
};

export { login, register };
