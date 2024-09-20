import { defaultAxios } from '@/axios';

export const register = async (formData, navigate) => {
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
    navigate('/signup/failure', {
      state: { message: e.response.data.message },
    });
  }
};

export async function sendUser(email) {
  const endpoint = '/v1/users/sendUser';
  const data = { email: email };

  try {
    await defaultAxios.post(endpoint, data);
  } catch (e) {
    console.log(e);
  }
}
