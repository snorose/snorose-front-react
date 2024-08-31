import axios from 'axios';
import { React, useContext } from 'react';
import { TokenContext } from '@/contexts/TokenContext';
export async function LoginAPI(
  e,
  setUser,
  setErrmsg,
  formData,
  navigate,
  setTokens
) {
  e.preventDefault();
  const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
  const endpoint = '/v1/users/login';
  try {
    const response = await axios.post(apiUrl + endpoint, formData);
    if (response.data.isSuccess) {
      const accessToken = response.data.result.tokenResponse.accessToken;
      const refreshToken = response.data.result.tokenResponse.refreshToken;
      setTokens((prev) => ({ ...prev, accessToken, refreshToken }));
      navigate('/');
    }
    setUser(response.data);
    setErrmsg(false);
    localStorage.setItem('user', response.data);
  } catch (e) {
    setErrmsg(true);
  }
}
export async function ReissueAPI() {
  const { tokens, setTokens } = useContext(TokenContext);
  if (!tokens.accessToken) {
    if (!tokens.refreshToken) {
      window.location.href = '/login';
    } else {
      const apiUrl = 'http://13.124.33.41:8081';
      const endpoint = '/v1/users/reissue';
      const response = await axios.post(apiUrl + endpoint, tokens.accessToken);
      setTokens((prev) => ({ ...prev, accessToken: response.accessToken }));
    }
  }
}

export async function FindIDAPI(e, formData, navigate) {
  e.preventDefault();
  const apiUrl = 'http://13.124.33.41:8081';
  const endpoint = '/v1/users/findid';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  };
  try {
    const response = await axios.post(apiUrl + endpoint, formData, {
      headers,
    });
    navigate('/found-id', {
      state: { loginId: response.data.result.loginId },
    });
  } catch (e) {
    if (!e.response.data.isSuccess) {
      navigate('/not-found-id', { state: { access: true } });
    }
  }
}
export async function FindPWAPI(e, formData, navigate) {
  e.preventDefault();
  const apiUrl = 'http://13.124.33.41:8081';
  const endpoint = '/v1/users/findPW';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  };
  try {
    await axios.post(apiUrl + endpoint, formData, {
      headers,
    });
    navigate('/found-pw', {
      state: { email: formData.email },
    });
  } catch (e) {
    if (!e.response.data.isSuccess) {
      navigate('/not-found-pw', { state: { access: true } });
    }
  }
}
