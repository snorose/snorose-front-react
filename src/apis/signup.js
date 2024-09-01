import { noAuthAxios } from '@/axios';
export async function RegisterAPI(formData, navigate) {
  const endpoint = '/v1/users/register';
  const data = { ...formData, userRoleId: 1, isBlacklist: false };
  data['major'] = data['name'];
  delete data['name'];
  try {
    await noAuthAxios.post(endpoint, data);
    navigate('/signup/success', {
      state: { access: true },
    });
  } catch (e) {
    navigate('/signup/failure', {
      state: { message: e.response.data.message },
    });
  }
}
export async function SendUserAPI(email) {
  const endpoint = '/v1/users/sendUser';
  const data = { email: email };
  try {
    await noAuthAxios.post(endpoint, data);
  } catch (e) {}
}
export async function CertifyUserAPI(data) {
  const endpoint = '/v1/users/certifyUser';
  if (data.authNum?.length === 0) {
    return 'ready';
  } else {
    try {
      const response = await noAuthAxios.post(endpoint, data);
      if (response.data.isSuccess) {
        return 'right';
      } else {
        return 'wrong';
      }
    } catch (e) {
      return 'wrong';
    }
  }
}
