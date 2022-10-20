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
        }
      }

      onSet((newValue, _, isReset) => {
        if (isReset || newValue === null) {
          tokenStorage.remove();
          return;
        }
        tokenStorage.set(newValue);

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newValue}`;
      });
    },
  ],
});
