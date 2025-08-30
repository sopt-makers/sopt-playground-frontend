import { atom } from 'recoil';

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

      onSet((token, _, isReset) => {
        if (isReset || token === null) {
          tokenStorage.remove();
          return;
        }
        tokenStorage.set(token);
      });
    },
  ],
});
