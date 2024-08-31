import axios from 'axios';
export async function LoginAPI(e, setUser, setErrmsg, formData, navigate) {
  e.preventDefault();
  const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
  const endpoint = '/v1/users/login';
  try {
    const response = await axios.post(apiUrl + endpoint, formData);
    if (response.data.isSuccess) {
      navigate('/');
    }
    setUser(response.data);
    setErrmsg(false);
    localStorage.setItem('user', response.data);
  } catch (e) {
    setErrmsg(true);
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
