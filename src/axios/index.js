import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: 'https://dev.snorose.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const authAxios = axios.create({
  baseURL: 'https://dev.snorose.com',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      alert('타임아웃');
      return;
    }

    return Promise.reject(error);
  }
);

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') ?? 'unauthorized';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { defaultAxios, authAxios };
