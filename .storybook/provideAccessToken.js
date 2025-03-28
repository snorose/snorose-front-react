import { defaultAxios } from '@/axios';

export async function provideAssociateMemberAccessToken() {
  const response = await defaultAxios.post('/v1/users/login', {
    loginId: 'test1',
    password: 'test1234!@',
  });
  localStorage.setItem(
    'accessToken',
    response?.data.result.tokenResponse.accessToken
  );
}

export async function provideFullMemberAccessToken() {
  const response = await defaultAxios.post('/v1/users/login', {
    loginId: 'test2',
    password: 'test1234!@',
  });
  localStorage.setItem(
    'accessToken',
    response?.data.result.tokenResponse.accessToken
  );
}
