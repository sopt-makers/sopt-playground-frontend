import { atom } from 'recoil';

import { isClientSide } from '@/utils';

type LoginMethods = null | 'facebook' | 'google' | 'apple';

const LAST_REGISTER_KEY = 'pg-lastRegister';

export const lastLoginMethodAtom = atom<LoginMethods>({
  key: 'lastLoginMethodAtom',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      if (isClientSide()) {
        const value = localStorage.getItem(LAST_REGISTER_KEY);
        if (value !== null) {
          setSelf(value as LoginMethods);
        }
      }

      onSet((token, _, isReset) => {
        if (isReset || token === null) {
          localStorage.removeItem(LAST_REGISTER_KEY);
          return;
        }
        localStorage.setItem(LAST_REGISTER_KEY, token);
      });
    },
  ],
});
