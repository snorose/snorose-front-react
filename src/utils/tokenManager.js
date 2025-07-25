export const getAccessToken = () => localStorage.getItem('accessToken');
export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isTokenExpired = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
  } catch (e) {
    //Decoding이 실패하면 만료된것으로 취급하기
    return true;
  }
};
