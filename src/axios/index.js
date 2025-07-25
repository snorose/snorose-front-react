import axios from 'axios';
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
  isTokenExpired,
} from '@/utils/tokenManager';

const defaultAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
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
let isRefreshing = false;
let refreshPromise = null;
authAxios.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    console.log(accessToken);
    const expired = isTokenExpired(accessToken);

    if (accessToken && expired) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = defaultAxios
          .post('/v1/users/reissueToken', {
            refreshToken: getRefreshToken(),
          })
          .then(({ data }) => {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = data.result;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            console.log(
              `accessToken: ${newAccessToken}\n refreshToken: ${newRefreshToken}`
            );
            window.location.reload();
            return newAccessToken;
          })
          .catch((e) => {
            console.error('Token refresh failed', e);
            throw e;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      try {
        accessToken = await refreshPromise;
      } catch (e) {
        return Promise.reject(e);
      }
    }
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
