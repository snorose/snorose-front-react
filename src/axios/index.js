import axios from 'axios';

export const authAxios = axios.create({
  baseURL: 'http://13.124.33.41:8081',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
