import { atom } from 'recoil';

import { axiosInstance } from '@/api';
import { safeDecodeAccessToken, tokenStorage } from '@/components/auth/util/accessToken';
import { isClientSide } from '@/utils';

export const accessTokenAtom = atom<string | null>({
  key: 'accessToken',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      if (isClientSide()) {
        const token = tokenStorage.get();
        if (token !== null && safeDecodeAccessToken(token)) {
          setSelf(token);
          axiosInstance.defaults.headers.common['Authorization'] = token;
        }
      }

      console.log('GOGO');

      onSet((token, _, isReset) => {
        console.log('SET');
        if (isReset || token === null) {
          tokenStorage.remove();
          return;
        }
        tokenStorage.set(token);

        axiosInstance.defaults.headers.common['Authorization'] = token;
      });
    },
  ],
});
