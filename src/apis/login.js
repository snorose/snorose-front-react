import { defaultAxios } from '@/axios';

import { useToast } from '@/hooks';

import { TOAST } from '@/constants';

export const useLogin = () => {
  const { toast } = useToast();
  const login = async (e, setIsError, formData, navigate) => {
    e.preventDefault();
    const endpoint = '/v1/users/login';

    if (!formData.loginId) {
      toast(TOAST.LOGIN.emptyId);
    } else if (!formData.password) {
      toast(TOAST.LOGIN.emptyPw);
    } else {
      try {
        const response = await defaultAxios.post(endpoint, formData);
        const { accessToken, refreshToken } =
          response?.data.result.tokenResponse;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        setIsError(false);
        navigate('/');
        window.location.reload();
      } catch (e) {
        if (e.response.status === 500) {
          toast(TOAST.ERROR.SERVER);
        } else {
          toast(e.response.data.message);
        }
        setIsError(true);
      }
    }
  };

  return login;
};

export const useFindId = () => {
  const { toast } = useToast();
  const findId = async (e, formData, navigate, setLoading) => {
    e.preventDefault();
    const endpoint = '/v1/users/findid';

    if (formData.userName && formData.studentNumber) {
      try {
        //로딩중인지 아닌지 확인하는 setLoading
        setLoading(true);
        const response = await defaultAxios.post(endpoint, formData);
        setLoading(false);
        console.log(response.data.result);
        navigate('/found-id', {
          state: { email: response.data.result },
        });
      } catch (e) {
        setLoading(false);
        if (e.response.status === 500) {
          toast(TOAST.ERROR.SERVER);
        } else {
          navigate('/not-found-id', { state: { access: true } });
        }
      }
    }
  };
  return findId;
};

export const useFindPw = () => {
  const { toast } = useToast();
  const findPw = async (e, formData, navigate, setLoading) => {
    e.preventDefault();
    const endpoint = '/v1/users/findPW';

    if (formData.loginId && formData.email) {
      try {
        setLoading(true);
        await defaultAxios.post(endpoint, formData);
        setLoading(false);

        navigate('/found-pw', {
          state: { email: formData.email },
        });
      } catch (e) {
        setLoading(false);
        if (e.response.status === 500) {
          toast(TOAST.ERROR.SERVER);
        } else {
          navigate('/not-found-pw', { state: { access: true } });
        }
      }
    }
  };
  return findPw;
};
