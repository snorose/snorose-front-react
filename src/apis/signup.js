import axios from 'axios';
export async function RegisterAPI(formData, navigate) {
  const data = { ...formData, userRoleId: 1, isBlacklist: false };
  data['major'] = data['name'];
  delete data['name'];
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + '/v1/users/register',
      data
    );
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
  const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
  const endpoint = '/v1/users/sendUser';
  const data = { email: email };
  try {
    const response = await axios.post(apiUrl + endpoint, data);
  } catch (e) {
    console.log(e);
  }
}
export async function CertifyUserAPI(data) {
  const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
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
