import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

authAxios.defaults.timeout = 5000;

export { authAxios };
