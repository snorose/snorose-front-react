import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

authAxios.defaults.timeout = 5000;

const noAuthAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
});

export { authAxios, noAuthAxios };
