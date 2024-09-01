import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: !!localStorage.getItem('accessToken')
      ? `Bearer ${localStorage.getItem('accessToken')}`
      : undefined,
  },
});

authAxios.defaults.timeout = 5000;

export { authAxios };
