import { atom } from 'recoil';

import { isClientSide } from '@/utils';

const REGISTER_TOKEN_KEY = 'registerToken';

export const registerTokenAtom = atom<{ type: 'register' | 'reset'; value: string } | null>({
  key: 'registerTokenAtom',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      if (isClientSide()) {
        const token = sessionStorage.getItem(REGISTER_TOKEN_KEY);
        if (token !== null) {
          try {
            setSelf(JSON.parse(token));
          } catch {
            sessionStorage.removeItem(REGISTER_TOKEN_KEY);
          }
        }
      }

      onSet((token, _, isReset) => {
        if (isReset || token === null) {
          sessionStorage.removeItem(REGISTER_TOKEN_KEY);
          return;
        }
        sessionStorage.setItem(REGISTER_TOKEN_KEY, JSON.stringify(token));
      });
    },
  ],
});
