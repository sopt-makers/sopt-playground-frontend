import { atom } from 'recoil';

export const profileDropdownAtom = atom<boolean>({
  key: 'profileDropdown',
  default: false,
});
