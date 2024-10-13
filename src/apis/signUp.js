import { defaultAxios } from '@/axios';

import { useToast } from '@/hooks';

import { TOAST } from '@/constants';

export const useRegister = () => {
  const { toast } = useToast();
  const register = async (formData, navigate) => {
    const endpoint = '/v1/users/register';
    const data = { ...formData, userRoleId: 1, isBlacklist: false };

    data['major'] = data['name'];
    delete data['name'];

    try {
      await defaultAxios.post(endpoint, data);
      navigate('/signup/success', {
        state: { access: true },
      });
    } catch (e) {
      if (e.response.status === 500) {
        toast(TOAST.ERROR.SERVER);
      } else {
        navigate('/signup/failure', {
          state: { message: e.response.data.message },
        });
      }
    }
  };
  return register;
};

export const useSendUser = () => {
  const { toast } = useToast();
  const sendUser = async (email) => {
    const endpoint = '/v1/users/sendUser';
    const data = { email: email };

    try {
      await defaultAxios.post(endpoint, data);
    } catch (e) {
      if (e.response.status === 500) {
        toast(TOAST.ERROR.SERVER);
      }
    }
  };
  return sendUser;
};

export const useCertifyUser = () => {
  const { toast } = useToast();
  const certifyUser = async (data) => {
    if (data.authNum?.length === 0) {
      return false;
    } else {
      try {
        const response = await defaultAxios.post('/v1/users/certifyUser', data);
        if (response.data.isSuccess) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        if (e.response.status === 500) {
          toast(TOAST.ERROR.SERVER);
        }
        return false;
      }
    }
  };
  return certifyUser;
};
