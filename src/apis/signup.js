import axios from 'axios';
export async function RegisterAPI(formData, navigate) {
  const data = { ...formData, userRoleId: 1, isBlacklist: false };
  data['major'] = data['name'];
  delete data['name'];
  try {
    const response = await axios.post(
      'http://13.124.33.41:8081/v1/users/register',
      data
    );
    if (response.data.isSuccess) {
      navigate('/signup/success', {
        state: { access: true },
      });
    }
  } catch (e) {
    navigate('/signup/failure', {
      state: { message: e.response.data.message },
    });
  }
}
export async function SendUserAPI(email) {
  const apiUrl = 'http://13.124.33.41:8081';
  const endpoint = '/v1/users/sendUser';
  const data = { email: email };
  try {
    const response = await axios.post(apiUrl + endpoint, data);
  } catch (e) {
    console.log(e);
  }
}
export async function CertifyUserAPI(data) {
  const apiUrl = 'http://13.124.33.41:8081';
  const endpoint = '/v1/users/certifyUser';
  if (data.authNum?.length === 0) {
    return 'ready';
  } else {
    try {
      const response = await axios.post(apiUrl + endpoint, data);
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
