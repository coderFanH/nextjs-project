import axios from 'axios';
import { getCookie } from '@/utils/cookies';

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://localhost:3000';
} else {
  baseURL = 'http://localhost:3000';
}

// 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  },
);
axios.interceptors.request.use(
  (config) => {
    const token = getCookie('token', config.headers.cookie);

    if (token) {
      config.headers['Authorization'] = token;
    }
    config.baseURL = baseURL;
    config.timeout = 10000;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// axios的get请求
export function getAxios(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log('getAxios err', err);
        reject(err);
      });
  });
}

// axios的post请求
export function postAxios(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log('postAxios err', err);
        reject(err);
      });
  });
}

export default axios;
