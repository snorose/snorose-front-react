import { defaultAxios } from '@/axios';
import { useToast } from '@/hooks';
import { TOAST } from '@/constants';

export const useLogin = () => {
  const { toast } = useToast();
  const login = async (e, setUser, setErrmsg, formData, navigate) => {
    e.preventDefault();
    const endpoint = '/v1/users/login';
    try {
      const response = await defaultAxios.post(endpoint, formData);
      const { accessToken, refreshToken } = response.data.result.tokenResponse;
      navigate('/');
      setUser(response.data);
      setErrmsg(false);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } catch (e) {
      toast(TOAST.LOGIN.loginFailure);
      setErrmsg(true);
    }
  };
  return login;
};

export const findId = async (e, formData, navigate) => {
  e.preventDefault();
  const endpoint = '/v1/users/findid';
  try {
    const response = await defaultAxios.post(endpoint, formData);
    navigate('/found-id', {
      state: { loginId: response.data.result.loginId },
    });
  } catch (e) {
    if (!e.response.data.isSuccess) {
      navigate('/not-found-id', { state: { access: true } });
    }
  }
};
export const findPw = async (e, formData, navigate) => {
  e.preventDefault();
  const endpoint = '/v1/users/findPW';
  try {
    await defaultAxios.post(endpoint, formData);
    navigate('/found-pw', {
      state: { email: formData.email },
    });
  } catch (e) {
    if (!e.response.data.isSuccess) {
      navigate('/not-found-pw', { state: { access: true } });
    }
  }
};
