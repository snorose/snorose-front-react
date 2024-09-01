import { noAuthAxios } from '@/axios';
export async function LoginAPI(e, setUser, setErrmsg, formData, navigate) {
  e.preventDefault();
  const endpoint = '/v1/users/login';
  try {
    const response = await noAuthAxios.post(endpoint, formData);
    const { accessToken, refreshToken } = response.data.result.tokenResponse;
    navigate('/');
    setUser(response.data);
    setErrmsg(false);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch (e) {
    setErrmsg(true);
  }
}

export async function FindIDAPI(e, formData, navigate) {
  e.preventDefault();
  const endpoint = '/v1/users/findid';
  try {
    const response = await noAuthAxios.post(endpoint, formData);
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
  const endpoint = '/v1/users/findPW';
  try {
    await noAuthAxios.post(endpoint, formData);
    navigate('/found-pw', {
      state: { email: formData.email },
    });
  } catch (e) {
    if (!e.response.data.isSuccess) {
      navigate('/not-found-pw', { state: { access: true } });
    }
  }
}
