import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    userInfo: null,
    status: 'loading',
  },
});
