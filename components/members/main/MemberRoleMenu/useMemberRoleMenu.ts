import { useCallback, useState } from 'react';

import { MenuValue } from '@/components/members/main/MemberRoleMenu';

const useMemberRoleMenu = (defaultValue?: MenuValue) => {
  const [menuValue, setMenuValue] = useState<MenuValue>(defaultValue ?? MenuValue.ALL);
  const onSelect = useCallback((value: MenuValue) => setMenuValue(value), []);

  return { menuValue, onSelect };
};

export default useMemberRoleMenu;
